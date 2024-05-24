

$('.cerMain').hide();
$('.cerBtn').on('click', function() {
})


function uploadFile() {
    const fileInput = document.getElementById('cerInputImg');
    const file = fileInput.files[0];

    if (!file) {
        alert('파일을 선택하세요.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    console.log("formData: ", formData.get("file"));
    return;
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('파일 업로드 실패');
        }
        return response.text();
    })
    .then(data => {
        alert('파일 업로드 성공: ' + data);
    })
    .catch(error => {
        console.error('오류 발생:', error);
        alert('파일 업로드 중 오류가 발생했습니다.');
    });
}


function uploadSaveFile() {
    const fileInput = document.getElementById('cerInputImg');
    const file = fileInput.files[0];

    if (!file) {
        alert('파일을 선택하세요.');
        return;
    }

    // 파일을 읽기 위한 FileReader 객체 생성
    const reader = new FileReader();

    // 파일이 읽혔을 때 실행되는 이벤트 핸들러
    reader.onload = function(event) {
        // 읽은 파일의 내용을 서버로 전송하는 코드 작성
        const fileContent = event.target.result;
        console.log('파일 내용:', fileContent);

        // 이후 서버로 파일 내용을 전송하는 작업을 수행할 수 있습니다.
        // 예를 들어 fetch API를 사용하여 서버로 전송할 수 있습니다.
    };

    // 파일을 텍스트 형식으로 읽기
    reader.readAsText(file);
}