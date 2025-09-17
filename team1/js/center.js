async function searchCenter(type) {
  const sidoSelect = document.querySelector('select[name="sido"]');
  const sigunguSelect = document.querySelector('select[name="sigungu"]');

  const sidoCode = sidoSelect.value;
  const sigunguText = sigunguSelect.options[sigunguSelect.selectedIndex]?.text || '';
  const sidoText = sidoSelect.options[sidoSelect.selectedIndex]?.text || '';

  // 시도 또는 시군구 선택 안 된 경우 처리
  if (!sidoCode || !sigunguText) {
    alert("시도와 시군구를 모두 선택해주세요.");
    return;
  }

  const insttNm = `${sidoText}%20${sigunguText}`.trim();

  try {
    const response = await fetch(`./api/searchCenter.php?instt_nm=${insttNm}&pageNo=1&numOfRows=30`);

    if (!response.ok) throw new Error('API 요청 실패');

    const data = await response.json();
     console.log(data);
     
    const items = data.response?.body?.items?.item || [];

    const container = document.querySelector('.emerContents .inner');
    container.innerHTML = '';

    items.forEach(item => {
      const isOpen = item.operSttusCd === '운영중';
      const urlX = item.longitude || '';
      const urlY = item.latitude || '';
      const phone = item.operPhoneNumber || '';
      const distance = item.distance || '정보 없음';

      const colEm = document.createElement('div');
      colEm.className = 'col-em';
      colEm.innerHTML = `
        <div class="stit">
            <h5>${distance}</h5>
            <h2>${item.hpNm || '병원명 정보 없음'}</h2>
            <p class="time"><span class="${isOpen ? 'open' : 'end'}">${isOpen ? '운영중' : '운영종료'}</span> ${item.operInfo || ''}</p>
            <p>${item.rdnmadr || ''}<br/>${phone}</p>
        </div>
        <div class="btns">
            <button onclick="window.open('https://map.kakao.com/?map_type=TYPE_MAP&Level=3&urlX=${urlX}&urlY=${urlY}')" class="naverbtn">
              지도보기 <i class="fa-solid fa-location-dot"></i>
            </button>
            <button ${phone ? `onclick="window.open('tel:${phone}')" ` : 'disabled'} class="telbtn">
              전화걸기 <i class="fa-solid fa-phone"></i>
            </button>
        </div>
      `;
      container.appendChild(colEm);
    });

  } catch (error) {
    console.error(error);
    alert('데이터를 불러오는데 실패했습니다.');
  }
}



  async function sido_change() {
  const sidoSelect = document.getElementById("sido");
  const sigunguSelect = document.getElementById("sigungu");
  const sidoCode = sidoSelect.value;

  if (!sidoCode) {
    sigunguSelect.innerHTML = '<option>시/군/구를 선택해주세요.</option>';
    return;
  }

  sigunguSelect.innerHTML = '<option>로딩 중...</option>';

  try {
    // PHP 프록시 호출 (/api/sigungu.php?admCode=시도코드)
    const response = await fetch(`./api/sigungu.php?admCode=${encodeURIComponent(sidoCode)}`);
    if (!response.ok) throw new Error(`HTTP 오류: ${response.status}`);

    const data = await response.json();

    const items = data.admVOList?.admVOList;

    if (!items || items.length === 0) {
      sigunguSelect.innerHTML = '<option>조회된 시군구가 없습니다.</option>';
      return;
    }

    sigunguSelect.innerHTML = ''; // 초기화

    items.forEach(item => {
      const option = document.createElement('option');
      option.value = item.lowestAdmCodeNm;
      option.textContent = item.lowestAdmCodeNm;
      sigunguSelect.appendChild(option);
    });
  } catch (error) {
    console.error('데이터 요청 실패:', error);
    sigunguSelect.innerHTML = `<option>데이터 요청 실패: ${error.message}</option>`;
  }
}
