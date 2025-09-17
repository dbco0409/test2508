<?php
// proxy.php

header('Content-Type: application/json');

// API 요청 변수 받기 (예: admCode)
$admCode = isset($_GET['admCode']) ? $_GET['admCode'] : '';
if (!$admCode) {
    echo json_encode(['error' => 'admCode 파라미터가 필요합니다.']);
    exit;
}

// API 정보
$apiKey = '0AF224B1-21FC-3A7E-A732-A9512718BA31';  // 여기에 본인 API 키 넣기
$domain = 'theresebelivet.mycafe24.com'; // 본인 도메인

// API URL 및 파라미터 생성
$apiUrl = 'http://api.vworld.kr/ned/data/admSiList';
$params = http_build_query([
    'key' => $apiKey,
    'domain' => $domain,
    'admCode' => $admCode,
    'format' => 'json',
    'numOfRows' => 1000,
    'pageNo' => 1
]);

// 전체 요청 URL
$requestUrl = $apiUrl . '?' . $params;

// cURL 초기화
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $requestUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10); // 타임아웃 10초 설정

// API 요청 실행
$response = curl_exec($ch);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'API 요청 실패: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode != 200) {
    http_response_code($httpCode);
    echo json_encode(['error' => 'API 서버 에러, 상태 코드: ' . $httpCode]);
    exit;
}

// API 응답을 그대로 클라이언트에 출력
echo $response;
