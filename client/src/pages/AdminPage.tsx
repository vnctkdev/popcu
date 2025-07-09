import React, { useState, useEffect } from 'react';
import { fetchEvents } from '../api/events';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function AdminPage() {
  const [token, setToken] = useState('');
  const [authed, setAuthed] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [form, setForm] = useState<any>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchList = () => {
    setLoading(true);
    fetchEvents().then(setEvents).finally(() => setLoading(false));
  };

  useEffect(() => {
    if (authed) fetchList();
  }, [authed]);

  const handleAuth = () => {
    if (token) setAuthed(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/events/${editingId}`, form, { headers: { 'x-admin-token': token } });
        setSuccess('수정 완료!');
      } else {
        await axios.post(`${API_URL}/api/events`, form, { headers: { 'x-admin-token': token } });
        setSuccess('등록 완료!');
      }
      setForm({});
      setEditingId(null);
      fetchList();
    } catch (e: any) {
      setError(e?.response?.data?.error || '오류 발생');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ev: any) => {
    setForm(ev);
    setEditingId(ev._id);
    setSuccess('');
    setError('');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.delete(`${API_URL}/api/events/${id}`, { headers: { 'x-admin-token': token } });
      setSuccess('삭제 완료!');
      fetchList();
    } catch (e: any) {
      setError(e?.response?.data?.error || '오류 발생');
    } finally {
      setLoading(false);
    }
  };

  if (!authed) {
    return (
      <div style={{ maxWidth: 360, margin: '0 auto', padding: '2rem 1rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>관리자 인증</h2>
        <input
          type="password"
          placeholder="관리자 토큰 입력"
          value={token}
          onChange={e => setToken(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
        <button onClick={handleAuth} style={{ width: '100%', padding: 10, background: '#111', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600 }}>인증</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>이벤트 {editingId ? '수정' : '등록'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        <input name="name" placeholder="이벤트명" value={form.name || ''} onChange={handleChange} required />
        <select name="type" value={form.type || ''} onChange={handleChange} required>
          <option value="">유형 선택</option>
          <option value="popup">팝업</option>
          <option value="festival">페스티벌</option>
          <option value="concert">콘서트</option>
        </select>
        <input name="startDate" type="date" value={form.startDate?.slice(0,10) || ''} onChange={handleChange} required />
        <input name="endDate" type="date" value={form.endDate?.slice(0,10) || ''} onChange={handleChange} required />
        <input name="location" placeholder="장소" value={form.location || ''} onChange={handleChange} required />
        <input name="region" placeholder="지역(예: 서울)" value={form.region || ''} onChange={handleChange} required />
        <input name="imageUrl" placeholder="대표 이미지 URL" value={form.imageUrl || ''} onChange={handleChange} required />
        <input name="link" placeholder="예매/상세 링크" value={form.link || ''} onChange={handleChange} required />
        <textarea name="description" placeholder="간단한 소개(선택)" value={form.description || ''} onChange={handleChange} rows={3} />
        <button type="submit" style={{ padding: 10, background: '#111', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600 }}>{editingId ? '수정' : '등록'}</button>
        {editingId && <button type="button" onClick={() => { setForm({}); setEditingId(null); }} style={{ padding: 10, background: '#eee', color: '#111', border: 'none', borderRadius: 6 }}>취소</button>}
      </form>
      {error && <div style={{ color: 'crimson', marginBottom: 8 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 1rem' }}>이벤트 목록</h3>
      {loading ? (
        <div style={{ color: '#888', margin: '2rem 0' }}>불러오는 중...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {events.map(ev => (
            <div key={ev._id} style={{ background: '#fff', border: '1px solid #eee', borderRadius: 8, padding: '1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={ev.imageUrl} alt={ev.name} style={{ width: 56, height: 70, objectFit: 'cover', borderRadius: 6, background: '#eee' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{ev.name}</div>
                <div style={{ color: '#888', fontSize: '0.95rem' }}>{ev.startDate?.slice(0,10)} ~ {ev.endDate?.slice(0,10)}</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem' }}>{ev.location} ({ev.region})</div>
              </div>
              <button onClick={() => handleEdit(ev)} style={{ background: '#eee', color: '#111', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 500 }}>수정</button>
              <button onClick={() => handleDelete(ev._id)} style={{ background: 'crimson', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 500 }}>삭제</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPage; 