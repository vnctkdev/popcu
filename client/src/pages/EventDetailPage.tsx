import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchEventDetail } from '../api/events';

function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    fetchEventDetail(id)
      .then(setEvent)
      .catch(() => setError('이벤트 정보를 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', margin: '2rem 0', color: '#888' }}>불러오는 중...</div>;
  if (error) return <div style={{ textAlign: 'center', margin: '2rem 0', color: 'crimson' }}>{error}</div>;
  if (!event) return <div style={{ textAlign: 'center', margin: '2rem 0', color: '#888' }}>이벤트가 없습니다.</div>;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '2rem 1rem' }}>
      <Link to="/" style={{ color: '#007aff', textDecoration: 'underline', fontSize: '0.95rem' }}>← 목록으로</Link>
      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px #0001', marginTop: 16 }}>
        <div style={{ background: `url(${event.imageUrl}) center/cover`, aspectRatio: '4/5' }} />
        <div style={{ padding: '1.5rem' }}>
          <div style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: 8 }}>{event.name}</div>
          <div style={{ color: '#888', fontSize: '1rem', marginBottom: 4 }}>{event.startDate?.slice(0,10)} ~ {event.endDate?.slice(0,10)}</div>
          <div style={{ color: '#aaa', fontSize: '0.98rem', marginBottom: 8 }}>{event.location} ({event.region})</div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ background: '#111', color: '#fff', borderRadius: 4, padding: '0 8px', fontSize: '0.95rem' }}>{event.type}</span>
          </div>
          {event.description && <div style={{ marginBottom: 12, color: '#222', fontSize: '1rem', lineHeight: 1.6 }}>{event.description}</div>}
          <a href={event.link} target="_blank" rel="noopener noreferrer" style={{ color: '#007aff', textDecoration: 'underline', fontWeight: 500 }}>예매/상세 링크 바로가기</a>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage; 