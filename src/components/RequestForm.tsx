import React, { useState, useEffect } from 'react';
import { mockApi, type Hospital } from '../lib/supabase';
import { Building, Send, Info } from 'lucide-react';
import toast from 'react-hot-toast';

interface RequestFormProps {
  onCancel: () => void;
  onSubmitSuccess: () => void;
}

export const RequestForm: React.FC<RequestFormProps> = ({ onCancel, onSubmitSuccess }) => {
  const [partners, setPartners] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    patientInitials: '',
    age: '',
    gender: 'M',
    primaryDiagnosis: '',
    adlStatus: '독립 보행',
    needsOxygen: false,
    hasInfection: false,
    notes: '',
    toHospitalId: ''
  });

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    setLoading(true);
    const all = await mockApi.getHospitals();
    setPartners(all.filter(h => h.type === 'partner'));
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.toHospitalId) {
      alert("협력병원을 선택해주세요.");
      return;
    }
    setSubmitting(true);
    
    // In MVP, we hardcode the sender ID
    await mockApi.createRequest({
      ...formData,
      fromHospitalId: 'h1'
    });
    
    setSubmitting(false);
    toast.success('회송 요청이 성공적으로 전송되었습니다!', {
      style: { borderRadius: '10px', background: '#333', color: '#fff' }
    });
    onSubmitSuccess();
  };

  return (
    <div className="card mb-6 border-l-4" style={{ borderLeftColor: 'var(--primary-color)' }}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">환자 회송 요청서 작성</h3>
        <button className="btn btn-outline" onClick={onCancel}>취소</button>
      </div>
      
      <div className="flex items-center gap-2 mb-6 p-4 bg-blue-50 text-blue-700 rounded-md text-sm border border-blue-100">
        <Info size={16} />
        <p>EMR 연동 전 MVP입니다. 환자의 불필요한 개인 신상정보(주민번호 등)는 저장되지 않습니다.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">환자 식별자 (이니셜/번호)</label>
            <input 
              type="text" 
              className="form-input" 
              name="patientInitials"
              value={formData.patientInitials}
              onChange={handleChange}
              placeholder="예: 김O동 (1234)" 
              required 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">나이</label>
              <input 
                type="number" 
                className="form-input" 
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="세" 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">성별</label>
              <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="M">남 (M)</option>
                <option value="F">여 (F)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">주 진단명</label>
          <input 
            type="text" 
            className="form-input" 
            name="primaryDiagnosis"
            value={formData.primaryDiagnosis}
            onChange={handleChange}
            placeholder="주요 진단 및 수술명" 
            required 
          />
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 mt-2">
          <div className="form-group">
            <label className="form-label">ADL (거동 상태)</label>
            <select className="form-select" name="adlStatus" value={formData.adlStatus} onChange={handleChange}>
              <option value="독립 보행">독립 보행</option>
              <option value="워커/지팡이 보행">워커/지팡이 보행</option>
              <option value="휠체어 이용">휠체어 이용</option>
              <option value="침상 이동">침상 이동 (Bedridden)</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-3 mt-1 justify-center">
             <label className="checkbox-group">
               <input type="checkbox" className="checkbox-custom" name="needsOxygen" checked={formData.needsOxygen} onChange={handleChange} />
               <span className="text-sm font-medium">산소 치료(O2) 필요 여부</span>
             </label>
             <label className="checkbox-group">
               <input type="checkbox" className="checkbox-custom" name="hasInfection" checked={formData.hasInfection} onChange={handleChange} />
               <span className="text-sm font-medium">감염균 (VRE, CRE 등) 보유 여부</span>
             </label>
          </div>
        </div>

        <div className="form-group border-t border-gray-100 pt-4 mt-2">
          <label className="form-label">기타 특이사항 (선택)</label>
          <textarea 
            className="form-textarea" 
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="특수 투약, 재활 필요 여부 등"
          ></textarea>
        </div>

        <div className="form-group bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
          <label className="form-label flex items-center gap-2 mb-3 text-lg">
            <Building size={18} /> 수신할 협력병원 선택
          </label>
          {loading ? (
             <div className="text-sm text-gray-500">병원을 불러오는 중...</div>
          ) : (
             <div className="grid grid-cols-2 gap-3" style={{ maxHeight: '180px', overflowY: 'auto' }}>
               {partners.map(hospital => (
                 <label 
                   key={hospital.id} 
                   className={`border rounded flex justify-between p-3 cursor-pointer transition-all ${
                     formData.toHospitalId === hospital.id ? 'border-primary-color bg-primary-light ring-2 ring-primary-color ring-opacity-20' : 'border-gray-200 bg-white hover:border-gray-300'
                   } ${!hospital.acceptingPatients && 'opacity-50 grayscale'}`}
                 >
                   <div className="flex items-center gap-2">
                     <input 
                       type="radio" 
                       name="toHospitalId" 
                       value={hospital.id}
                       checked={formData.toHospitalId === hospital.id}
                       onChange={handleChange}
                       disabled={!hospital.acceptingPatients}
                       style={{ width: '1.25rem', height: '1.25rem' }}
                     />
                     <span className="font-medium text-sm">{hospital.name}</span>
                   </div>
                   <div className="text-xs flex items-center">
                     {hospital.acceptingPatients ? (
                       <span className="text-green-600 font-semibold">{hospital.availableBeds}병상 여유</span>
                     ) : (
                       <span className="text-red-500">수용 불가</span>
                     )}
                   </div>
                 </label>
               ))}
             </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }} disabled={submitting}>
            <Send size={18} />
            {submitting ? '전송 중...' : '회송 요청 전송하기'}
          </button>
        </div>
      </form>
    </div>
  );
};
