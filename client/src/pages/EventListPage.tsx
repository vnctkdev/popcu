import React from "react";
import './EventListPage.ohj.css';

const categories = [
  { label: '전체', value: 'all' },
  { label: '팝업', value: 'popup' },
  { label: '콘서트', value: 'concert' },
  { label: '페스티벌', value: 'festival' },
  { label: '스포츠', value: 'sports' },
  { label: '전시회', value: 'exhibition' },
  { label: '플리마켓', value: 'flea' },
];
const sortOptions = [
  { label: '인기순', value: 'popular' },
  { label: '최신순', value: 'latest' },
  { label: '마감임박순', value: 'ending' },
];

const categoryColors: Record<string, string> = {
  '팝업': '#fbb6ce',
  '콘서트': '#a5b4fc',
  '페스티벌': '#6ee7b7',
  '스포츠': '#fcd34d',
  '전시회': '#fca5a5',
  '플리마켓': '#fdba74',
  '전체': '#f87171',
};

type Event = {
  _id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  description: string;
};

const EventListPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [sort, setSort] = React.useState('popular');
  const [view, setView] = React.useState('grid');
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    // 실제 서버에서 이벤트 목록 불러오기 (예시)
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(() => setEvents([]));
  }, []);

  return (
    <div className="popcu-root">
      {/* 상단 네비게이션 */}
      <nav className="popcu-nav">
        <div className="popcu-nav-left">
          <span className="popcu-logo-icon" aria-label="위치 아이콘">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="14" r="14" fill="#F87171"/>
              <path d="M14 7.5C10.9624 7.5 8.5 9.96243 8.5 13C8.5 16.0376 14 22 14 22C14 22 19.5 16.0376 19.5 13C19.5 9.96243 17.0376 7.5 14 7.5ZM14 15.25C12.7574 15.25 11.75 14.2426 11.75 13C11.75 11.7574 12.7574 10.75 14 10.75C15.2426 10.75 16.25 11.7574 16.25 13C16.25 14.2426 15.2426 15.25 14 15.25Z" fill="white"/>
            </svg>
          </span>
          <span className="popcu-logo-text">PopCu</span>
        </div>
        <button className="popcu-nav-search" aria-label="검색">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="7.5" stroke="#222" strokeWidth="2"/>
            <path d="M16 16L20 20" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </nav>
      {/* 카테고리 필터 */}
      <div className="popcu-category-scroll">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={
              'popcu-category-btn' + (selectedCategory === cat.value ? ' active' : '')
            }
            onClick={() => setSelectedCategory(cat.value)}
            type="button"
          >
            {cat.label}
          </button>
        ))}
      </div>
      {/* 정렬/토글 */}
      <div className="popcu-sort-toggle-row">
        <div className="popcu-sort-wrap">
          <select
            className="popcu-sort-select"
            value={sort}
            onChange={e => setSort(e.target.value)}
            aria-label="정렬 기준 선택"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <span className="popcu-sort-arrow" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 7.5L9 12L13.5 7.5" stroke="#222" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
        <div className="popcu-toggle-group">
          <button
            className={view === 'grid' ? 'active' : ''}
            aria-label="카드형 보기"
            onClick={() => setView('grid')}
            type="button"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="6" height="6" rx="2" fill={view === 'grid' ? '#f87171' : '#e5e7eb'}/>
              <rect x="13" y="3" width="6" height="6" rx="2" fill={view === 'grid' ? '#f87171' : '#e5e7eb'}/>
              <rect x="3" y="13" width="6" height="6" rx="2" fill={view === 'grid' ? '#f87171' : '#e5e7eb'}/>
              <rect x="13" y="13" width="6" height="6" rx="2" fill={view === 'grid' ? '#f87171' : '#e5e7eb'}/>
            </svg>
          </button>
          <button
            className={view === 'list' ? 'active' : ''}
            aria-label="리스트형 보기"
            onClick={() => setView('list')}
            type="button"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="5" width="14" height="3" rx="1.5" fill={view === 'list' ? '#f87171' : '#e5e7eb'}/>
              <rect x="4" y="10" width="14" height="3" rx="1.5" fill={view === 'list' ? '#f87171' : '#e5e7eb'}/>
              <rect x="4" y="15" width="14" height="3" rx="1.5" fill={view === 'list' ? '#f87171' : '#e5e7eb'}/>
            </svg>
          </button>
        </div>
      </div>
      {/* 카드/리스트 토글에 따라 샘플 카드 5개 렌더링 */}
      {events.length > 0 ? (
        view === 'grid' ? (
          <section className="popcu-card-grid">
            {events.map(event => (
              <div className="popcu-card" key={event._id}>
                <div className="popcu-card-img-wrap">
                  <img src={event.imageUrl} alt={event.name} loading="lazy" />
                  <span className="popcu-card-badge" style={{['--badge-bg' as any]: categoryColors[event.type] || '#f87171'}}>{event.type}</span>
                </div>
                <div className="popcu-card-info">
                  <div className="popcu-card-title popcu-strong-title">{event.name}</div>
                  <div className="popcu-card-meta">
                    <span className="popcu-card-date">{event.startDate} ~ {event.endDate}</span>
                    <span className="popcu-card-location">{event.location}</span>
                  </div>
                  <div className="popcu-card-desc popcu-strong-desc">{event.description}</div>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="popcu-list">
            {events.map(event => (
              <div className="popcu-list-item" key={event._id}>
                <div className="popcu-list-img-wrap">
                  <img src={event.imageUrl} alt={event.name} loading="lazy" />
                  <span className="popcu-card-badge" style={{['--badge-bg' as any]: categoryColors[event.type] || '#f87171'}}>{event.type}</span>
                </div>
                <div className="popcu-list-info">
                  <div className="popcu-list-title popcu-strong-title">{event.name}</div>
                  <div className="popcu-list-meta">
                    <span className="popcu-list-date">{event.startDate} ~ {event.endDate}</span>
                    <span className="popcu-list-location">{event.location}</span>
                  </div>
                  <div className="popcu-list-desc popcu-strong-desc">{event.description}</div>
                </div>
              </div>
            ))}
          </section>
        )
      ) : (
        <div className="popcu-empty-list">등록된 이벤트가 없습니다.</div>
      )}
      {/* 푸터 */}
      <footer className="popcu-footer">
        <div className="popcu-footer-logo">
          <span className="popcu-logo-icon" aria-label="위치 아이콘">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="14" r="14" fill="#F87171"/>
              <path d="M14 7.5C10.9624 7.5 8.5 9.96243 8.5 13C8.5 16.0376 14 22 14 22C14 22 19.5 16.0376 19.5 13C19.5 9.96243 17.0376 7.5 14 7.5ZM14 15.25C12.7574 15.25 11.75 14.2426 11.75 13C11.75 11.7574 12.7574 10.75 14 10.75C15.2426 10.75 16.25 11.7574 16.25 13C16.25 14.2426 15.2426 15.25 14 15.25Z" fill="white"/>
            </svg>
          </span>
          <span className="popcu-logo-text">PopCu</span>
        </div>
        <div className="popcu-footer-instagram">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2.5" y="2.5" width="21" height="21" rx="6" stroke="#222" strokeWidth="2"/>
            <circle cx="13" cy="13" r="5" stroke="#222" strokeWidth="2"/>
            <circle cx="19.2" cy="6.8" r="1.2" fill="#222"/>
          </svg>
        </div>
        <div className="popcu-footer-copyright">
          Copyright © 2025 PopCu. All rights reserved.
        </div>
        <div className="popcu-footer-admin">관리자</div>
      </footer>
    </div>
  );
};

export default EventListPage; 