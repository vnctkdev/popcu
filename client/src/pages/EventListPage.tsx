import React, { useState, useEffect } from 'react';
import { fetchEvents } from '../api/events';
import { Link } from 'react-router-dom';

const eventTypes = [
  { label: '전체', value: '' },
  { label: '팝업', value: 'popup' },
  { label: '페스티벌', value: 'festival' },
  { label: '콘서트', value: 'concert' },
];

const regions = [
  '전체', '서울', '경기', '부산', '인천', '대구', '광주', '대전', '울산', '기타'
];

const sortOptions = [
  { label: '최신순', value: 'latest' },
  { label: '임박순', value: 'upcoming' },
  { label: '인기순', value: 'popular' },
];

function EventListPage() {
  const [type, setType] = useState('');
  const [region, setRegion] = useState('전체');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('latest');
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchEvents({ type, region, keyword, sort })
      .then(setEvents)
      .catch(() => setError('이벤트 목록을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [type, region, keyword, sort]);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>이벤트 목록</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <select value={type} onChange={e => setType(e.target.value)}>
          {eventTypes.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <select value={region} onChange={e => setRegion(e.target.value)}>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <input
          type="text"
          placeholder="키워드 검색"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          style={{ flex: 1, minWidth: 120 }}
        />
        <select value={sort} onChange={e => setSort(e.target.value)}>
          {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', color: '#888', margin: '2rem 0' }}>불러오는 중...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'crimson', margin: '2rem 0' }}>{error}</div>
      ) : events.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#888', margin: '2rem 0' }}>이벤트가 없습니다.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {events.map(event => (
            <div key={event._id} style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px #0001' }}>
              <div style={{ background: `url(${event.imageUrl}) center/cover`, aspectRatio: '4/5' }} />
              <div style={{ padding: '1rem' }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>{event.name}</div>
                <div style={{ color: '#888', fontSize: '0.95rem', marginBottom: 2 }}>{event.startDate?.slice(0,10)} ~ {event.endDate?.slice(0,10)}</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: 2 }}>{event.location}</div>
                <div style={{ display: 'flex', gap: 4, fontSize: '0.85rem' }}>
                  <span style={{ background: '#111', color: '#fff', borderRadius: 4, padding: '0 6px' }}>{event.type}</span>
                  <Link to={`/events/${event._id}`} style={{ color: '#007aff', textDecoration: 'underline', marginLeft: 'auto' }}>상세</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventListPage; 