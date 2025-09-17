<?php
header('Content-Type: application/json; charset=utf-8');

$serviceKey = 'b6QUXFo4NJdzDjrwkgiDQAoVJIhjHLU9NplomktTDExQr8f5t153FdoHN/hWgBpgNcbIWhNsL/fJSnFqNZGdvg==';  // 서비스키 입력
$pageNo = isset($_GET['pageNo']) ? intval($_GET['pageNo']) : 1;
$numOfRows = isset($_GET['numOfRows']) ? intval($_GET['numOfRows']) : 30;
$hpCnterSe = '정신보건';
$instt_nm = isset($_GET['instt_nm']) ? $_GET['instt_nm'] : '';

$apiUrl = "http://api.data.go.kr/openapi/tn_pubr_public_hp_cnter_api";
$params = http_build_query([
    'serviceKey' => $serviceKey,
    'pageNo' => $pageNo,
    'numOfRows' => $numOfRows,
    'type' => 'json',
    'hpCnterSe' => $hpCnterSe,
    'instt_nm' => $instt_nm
]);

$url = $apiUrl . '?' . $params;

// cURL 초기화 및 실행
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);

if(curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'API 요청 실패: '.curl_error($ch)]);
    curl_close($ch);
    exit;
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if($httpCode !== 200) {
    http_response_code($httpCode);
    echo json_encode(['error' => 'API 서버 오류: HTTP ' . $httpCode]);
    exit;
}

echo $response;
