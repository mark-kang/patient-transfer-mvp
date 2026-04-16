import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Mock Data Layer for MVP Prototyping ---
// To speed up development, we will use mock functions if env variables are not provided.
export type Hospital = {
  id: string;
  name: string;
  type: 'general' | 'partner'; // 상급병원 vs 협력병원
  availableBeds: number;
  acceptingPatients: boolean;
};

export type TransferRequest = {
  id: string;
  fromHospitalId: string;
  toHospitalId: string;
  patientInitials: string; // 환자 식별자(임시)
  age: string;             // 나이
  gender: string;          // 성별
  primaryDiagnosis: string;// 주진단명
  adlStatus: string;       // 일상생활수행능력
  needsOxygen: boolean;    // 산소 여부
  hasInfection: boolean;   // 감염 여부
  notes: string;
  status: 'pending' | 'viewed' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
};

export const MOCK_HOSPITALS: Hospital[] = [
  { id: 'h1', name: '서울대도병원(상급)', type: 'general', availableBeds: 0, acceptingPatients: false },
  { id: 'p1', name: '제일요양병원(협력)', type: 'partner', availableBeds: 12, acceptingPatients: true },
  { id: 'p2', name: '푸른재활병원(협력)', type: 'partner', availableBeds: 3, acceptingPatients: true },
  { id: 'p3', name: '은빛실버타운(협력)', type: 'partner', availableBeds: 0, acceptingPatients: false },
];

let mockRequests: TransferRequest[] = [];

export const mockApi = {
  getHospitals: async (): Promise<Hospital[]> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_HOSPITALS), 500));
  },
  getRequests: async (hospitalId: string, role: 'sender' | 'receiver'): Promise<TransferRequest[]> => {
    return new Promise(resolve => setTimeout(() => {
      const filtered = mockRequests.filter(r => 
        role === 'sender' ? r.fromHospitalId === hospitalId : r.toHospitalId === hospitalId
      );
      resolve(filtered);
    }, 500));
  },
  createRequest: async (request: Omit<TransferRequest, 'id' | 'status' | 'createdAt'>): Promise<TransferRequest> => {
    return new Promise(resolve => setTimeout(() => {
      const newReq: TransferRequest = {
        ...request,
        id: Math.random().toString(36).substring(7),
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      mockRequests = [newReq, ...mockRequests];
      resolve(newReq);
    }, 500));
  },
  updateRequestStatus: async (id: string, status: TransferRequest['status']): Promise<void> => {
    return new Promise(resolve => setTimeout(() => {
      mockRequests = mockRequests.map(r => r.id === id ? { ...r, status } : r);
      resolve();
    }, 300));
  }
};
