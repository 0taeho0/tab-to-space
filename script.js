const inputArea = document.getElementById('input');
const outputArea = document.getElementById('output');
const spaceCount = document.getElementById('spaceCount');
const convertBtn = document.getElementById('convertBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const toast = document.getElementById('toast');
const autoConvert = document.getElementById('autoConvert');
const darkMode = document.getElementById('darkMode');
const fileInput = document.getElementById('fileInput');

// 다크 모드 토글
darkMode.addEventListener('change', () => {
  document.body.classList.toggle('dark', darkMode.checked);
});

// 변환 함수
function convertTabs() {
  const spaces = ' '.repeat(parseInt(spaceCount.value));
  const converted = inputArea.value.replace(/\t/g, spaces);
  outputArea.value = converted;
}

// 버튼 클릭
convertBtn.addEventListener('click', convertTabs);

// 자동 변환
inputArea.addEventListener('input', () => {
  if (autoConvert.checked) {
    convertTabs();
  }
});

// 복사
copyBtn.addEventListener('click', () => {
  outputArea.select();
  document.execCommand('copy');
  showToast('📋 복사 완료!');
});

// 다운로드
downloadBtn.addEventListener('click', () => {
  const blob = new Blob([outputArea.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'converted.sql';
  a.click();
  URL.revokeObjectURL(url);
  showToast('⬇️ 파일 다운로드!');
});

// 파일 업로드
fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      inputArea.value = e.target.result;
      if (autoConvert.checked) convertTabs();
    };
    reader.readAsText(file);
  }
});

// 토스트 메시지
function showToast(message) {
  toast.textContent = message;
  toast.className = 'toast show';
  setTimeout(() => {
    toast.className = 'toast';
  }, 2000);
}
