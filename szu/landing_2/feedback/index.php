<?php

$act = isset($_REQUEST['act']) ? $_REQUEST['act'] : die('error');
$params = isset($_REQUEST['json']) ? json_decode($_REQUEST['json'], true) : array();
$jsonBox = array();
$error = array();
$info = array();
$exemple = array();
$form = array();
$host = $_SERVER['HTTP_HOST'];
$ref = $_SERVER['HTTP_REFERER'];
$toMailMail = 'info@zem-advokat.ru';

if($_POST['emailFeedbackGetList']) {
  $toEmail2 = $_POST['emailFeedbackGetList'];
  $toEmail2 = htmlspecialchars($toEmail2);
  $toEmail2 = urldecode($toEmail2);
  $toEmail2 = trim($toEmail2);
}

$form['callbackForm'] = array(
  'fields' => array(
    'nameCallback' => array(
      'title' => 'Имя',
      'validate' => array(
        'required' => true,
        'minlength' => '3',
        'maxlength' => '255',
      ),
      'messages' => array(
        'required' => 'Обязательное поле',
        'minlength' => 'Слишком короткое имя!',
        'maxlength' => 'Слишком длинное имя!',
      )
    ),
    'phoneCallback' => array(
      'title' => 'Телефон',
      'validate' => array(
        'required' => true,
        'preg' => "/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im",
      ),
      'messages' => array(
        'required' => 'Обязательное поле',
        'preg' => 'Неверный формат номера (+74951234567)',
      )
    )
  ),
  'cfg' => array(
    'charset' => 'utf-8',
    'subject' => 'Сообщение с сайта Содружество Земельных Юристов (Судебные споры)',
    'title' => 'Заказ услуги (Судебные споры)',
    'ajax' => true,
    'validate' => true,
    'from_email' => '',
    'from_name' => 'Содружество Земельных Юристов',
    'to_email' => $toMailMail,
    'to_name' => '',
    'geoip' => true,
    'referer' => true,
    'type' => 'html',
    'tpl' => true,
    'antispam' => 'email77',
    'antispamjs' => 'address77',
    'okay' => 'Сообщение отправлено - OK',
    'fuck' => 'Сообщение отправлено - ERROR',
    'spam' => 'Cпам робот',
    'notify' => 'color-modal-textbox',
    'usepresuf' => false
  )
);

$form['getPriceForm'] = array(
  'fields' => array(
    'nameGetPrice' => array(
      'title' => 'Имя',
      'validate' => array(
        'required' => true,
        'minlength' => '3',
        'maxlength' => '255',
      ),
      'messages' => array(
        'required' => 'Обязательное поле',
        'minlength' => 'Слишком короткое имя!',
        'maxlength' => 'Слишком длинное имя!',
      )
    ),
    'phoneGetPrice' => array(
      'title' => 'Телефон',
      'validate' => array(
        'required' => true,
        'preg' => "/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im",
      ),
      'messages' => array(
        'required' => 'Обязательное поле',
        'preg' => 'Неверный формат номера (+74951234567)',
      )
    ),
    'messageGetPrice' => array(
      'title' => 'Сообщение',
      'validate' => array(
        'required' => true,
      ),
      'messages' => array(
        'required' => 'Обязательное поле',
      )
    ),
  ),
  'cfg' => array(
    'charset' => 'utf-8',
    'subject' => 'Сообщение с сайта Содружество Земельных Юристов (Судебные споры)',
    'title' => 'Заказ услуги (Судебные споры)',
    'ajax' => true,
    'validate' => true,
    'from_email' => '',
    'from_name' => 'Содружество Земельных Юристов',
    'to_email' => $toMailMail,
    'to_name' => '',
    'geoip' => true,
    'referer' => true,
    'type' => 'html',
    'tpl' => true,
    'antispam' => 'email77',
    'antispamjs' => 'address77',
    'okay' => 'Сообщение отправлено - OK',
    'fuck' => 'Сообщение отправлено - ERROR',
    'spam' => 'Cпам робот',
    'notify' => 'color-modal-textbox',
    'usepresuf' => false
  )
);

$form['orderCallBackForm'] = array(
  'fields' => array(
    'nameOrderCallBack' => array(
      'title' => 'Имя',
      'validate' => array(
        'required' => true,
        'minlength' => '3',
        'maxlength' => '255',
      ),
      'messages' => array(
        'required' => 'Обязательное поле',
        'minlength' => 'Слишком короткое имя!',
        'maxlength' => 'Слишком длинное имя!',
      )
    ),
    'emailOrderCallBack' => array(
      'title' => 'E-mail',
      'validate' => array(
        'required' => true,
        'preg' => "/^[-a-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/",
      ),
      'messages' => array(
        'required' => 'Обязательное поле',
        'preg' => 'Неверный формат E-mail',
      )
    )
  ),
  'cfg' => array(
    'charset' => 'utf-8',
    'subject' => 'Сообщение с сайта Содружество Земельных Юристов (Судебные споры)',
    'title' => 'Заказ обратного звонка (Судебные споры)',
    'ajax' => true,
    'validate' => true,
    'from_email' => '',
    'from_name' => 'Содружество Земельных Юристов',
    'to_email' => $toMailMail,
    'to_name' => '',
    'geoip' => true,
    'referer' => true,
    'type' => 'html',
    'tpl' => true,
    'antispam' => 'email77',
    'antispamjs' => 'address77',
    'okay' => 'Сообщение отправлено - OK',
    'fuck' => 'Сообщение отправлено - ERROR',
    'spam' => 'Cпам робот',
    'notify' => 'color-modal-textbox',
    'usepresuf' => false
  )
);

$form['feedbackForm'] = array(
  'fields' => array(
    'nameFeedback' => array(
      'title' => 'Имя',
      'validate' => array(
        'required' => true,
        'minlength' => '3',
        'maxlength' => '255',
      ),
      'messages' => array(
        'required' => 'Обязательное поле',
        'minlength' => 'Слишком короткое имя!',
        'maxlength' => 'Слишком длинное имя!',
      )
    ),
    'phoneFeedback' => array(
      'title' => 'Телефон',
      'validate' => array(
        'required' => true,
        'preg' => "/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im",
      ),
      'messages' => array(
        'required' => 'Обязательное поле',
        'preg' => 'Неверный формат номера (+74951234567)',
      )
    ),
    'messageFeedback' => array(
      'title' => 'Сообщение',
      'validate' => array(
        'required' => true,
      ),
      'messages' => array(
        'required' => 'Обязательное поле',
      )
    ),
  ),
  'cfg' => array(
    'charset' => 'utf-8',
    'subject' => 'Сообщение с сайта Содружество Земельных Юристов (Выкуп помещений)',
    'title' => 'Форма обратной связи (Судебные споры)',
    'ajax' => true,
    'validate' => true,
    'from_email' => '',
    'from_name' => 'Содружество Земельных Юристов',
    'to_email' => $toMailMail,
    'to_name' => '',
    'geoip' => true,
    'referer' => true,
    'type' => 'html',
    'tpl' => true,
    'antispam' => 'email77',
    'antispamjs' => 'address77',
    'okay' => 'Сообщение отправлено - OK',
    'fuck' => 'Сообщение отправлено - ERROR',
    'spam' => 'Cпам робот',
    'notify' => 'color-modal-textbox',
    'usepresuf' => false
  )
);

$form['saveMoneyForm'] = array(
  'fields' => array(
    'nameSaveMoney' => array(
      'title' => 'Имя',
      'validate' => array(
        'required' => true,
        'minlength' => '3',
        'maxlength' => '255',
      ),
      'messages' => array(
        'required' => 'Обязательное поле',
        'minlength' => 'Слишком короткое имя!',
        'maxlength' => 'Слишком длинное имя!',
      )
    ),
    'phoneSaveMoney' => array(
      'title' => 'Телефон',
      'validate' => array(
        'required' => true,
        'preg' => "/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im",
      ),
      'messages' => array(
        'required' => 'Обязательное поле',
        'preg' => 'Неверный формат номера (+74951234567)',
      )
    ),
    'emailSaveMoney' => array(
      'title' => 'E-mail',
      'validate' => array(
        'required' => true,
        'preg' => "/^[-a-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/",
      ),
      'messages' => array(
        'required' => 'Обязательное поле',
        'preg' => 'Неверный формат E-mail',
      )
    )
  ),
  'cfg' => array(
    'charset' => 'utf-8',
    'subject' => 'Сообщение с сайта Содружество Земельных Юристов (Судебные споры)',
    'title' => 'Контакты для связи (Судебные споры)',
    'ajax' => true,
    'validate' => true,
    'from_email' => '',
    'from_name' => 'Содружество Земельных Юристов',
    'to_email' => $toMailMail,
    'to_name' => '',
    'geoip' => true,
    'referer' => true,
    'type' => 'html',
    'tpl' => true,
    'antispam' => 'email77',
    'antispamjs' => 'address77',
    'okay' => 'Сообщение отправлено - OK',
    'fuck' => 'Сообщение отправлено - ERROR',
    'spam' => 'Cпам робот',
    'notify' => 'color-modal-textbox',
    'usepresuf' => false
  )
);

if($act == 'cfg') {
  $jsonBox['configs'] = ExportConfigs($form);
  die(json_encode($jsonBox));
}

function ExportConfigs($form) {
  $need = array('antispam','antispamjs','notify');
  $conf = array();
  foreach($form as $name => $data) {
    foreach($data['cfg'] as $k => $cfg) {
      if(in_array($k, $need)) {
        $conf[$name]['cfg'][$k] = $cfg;
      }
    }
  }
  return $conf;
}

if(isset($form[$act])) {
  $form = $form[$act];
  $getdata = array();
  $sb = array();

  foreach($form['fields'] as $name => $field) {
    $title = (isset($field['title'])) ? $field['title'] : $name;
    $getdata[$name]['title'] = $title;
    $rawdata = isset($_POST[$name]) ? trim($_POST[$name]) : '';

    if(isset($field['validate'])) {
      $def = 'Поле с именем [ '.$name.' ] содержит ошибку.';
      // -0-
      if(isset($field['validate']['required']) && empty($rawdata)) {
        $error[$name] = isset($field['messages']['required']) ? sprintf($field['messages']['required'], $title) : (isset($messages['validator']['required']) ? sprintf($messages['validator']['required'], $title) : $def);
      }
      // -1-
      if(isset($field['validate']['minlength']) && mb_strlen($rawdata) < $field['validate']['minlength']) {
        $error[$name] = isset($field['messages']['minlength']) ? sprintf($field['messages']['minlength'], $title, $field['validate']['minlength']) : $def;
      }
      // -2-
      if(isset($field['validate']['maxlength']) && mb_strlen($rawdata) > $field['validate']['maxlength']) {
        $error[$name] = isset($field['messages']['maxlength']) ? sprintf($field['messages']['maxlength'], $title, $field['validate']['maxlength']) : $def;
      }
      // -3-
      if(isset($field['validate']['preg']) && mb_strlen($rawdata) > 0 && !preg_match($field['validate']['preg'], $rawdata)) {
        $error[$name] = isset($field['messages']['preg']) ? sprintf($field['messages']['preg'], $title, $field['validate']['preg']) : $def;
      }
      // -4-
      if(isset($field['validate']['substr']) && mb_strlen($rawdata) > $field['validate']['substr']) {
        $rawdata = mb_substr($rawdata, 0, $field['validate']['substr']);
      }

      $outdata = htmlspecialchars($rawdata);
      $getdata[$name]['value'] = $outdata;
    } else {
      $getdata[$name]['value'] = htmlspecialchars($rawdata);
    }

    if(empty($getdata[$name]['value'])) {
      unset($getdata[$name]);
    }
  }

  if(isset($form['cfg']['antispam']) && isset($_POST[$form['cfg']['antispam']])) {
    if(!empty($_POST[$form['cfg']['antispam']])) {
      $error[] = $form['cfg']['spam'];
    }
  }

  if(isset($form['cfg']['antispamjs']) && isset($_POST[$form['cfg']['antispamjs']])) {
    if(!empty($_POST[$form['cfg']['antispamjs']])) {
      $error[] = $form['cfg']['spam'];
    }
  }

  if(count($error) == 0) {
    if(function_exists("mb_internal_encoding")) {
      mb_internal_encoding($form['cfg']['charset']);
    }

    $get_fromName = (isset($form['fields'][$form['cfg']['from_name']]) && isset($getdata[$form['cfg']['from_name']]['value']) && mb_strlen($getdata[$form['cfg']['from_name']]['value']) > 2) ? $getdata[$form['cfg']['from_name']]['value'] : ((mb_strlen($form['cfg']['from_name']) > 2 && !isset($_POST[$form['cfg']['from_name']])) ? $form['cfg']['from_name'] : 'Anonymous');
    $get_fromEmail = (isset($form['fields'][$form['cfg']['from_email']]) && isset($getdata[$form['cfg']['from_email']]['value']) && mb_strpos('@', $getdata[$form['cfg']['from_email']]['value']) === false) ? $getdata[$form['cfg']['from_email']]['value'] : ((mb_strpos('@', $form['cfg']['from_email']) !== false) ? $form['cfg']['from_email'] : 'no-reply@'.$host);
    $fromName = (function_exists("mb_encode_mimeheader")) ? mb_encode_mimeheader($get_fromName, $form['cfg']['charset'], "Q") : $get_fromName;
    $sb['subject'] = (function_exists("mb_encode_mimeheader")) ? mb_encode_mimeheader($form['cfg']['subject'], $form['cfg']['charset'], "Q") : $form['cfg']['subject'];
    $toName = trim($form['cfg']['to_name'], " ,");
    $toEmail = trim($form['cfg']['to_email'], " ,");

    if(strpos($toName, ",") !== false) {
      $exp_toName = explode(",", $toName);
      $c = count($exp_toName);
      for($i=0; $i<$c; $i++) {
        $exp_toName[$i] = (function_exists("mb_encode_mimeheader")) ? mb_encode_mimeheader(trim($exp_toName[$i]), $form['cfg']['charset'], "Q") : trim($exp_toName[$i]);
      }
    } else {
      $toName = (function_exists("mb_encode_mimeheader")) ? mb_encode_mimeheader($toName, $form['cfg']['charset'], "Q") : $toName;
    }

    if(strpos($toEmail, ",") !== false) {
      $exp_toEmail = explode(",", $toEmail);
    }

    $To = '';

    if(isset($exp_toEmail)) {
      $c = count($exp_toEmail);
      for($i=0; $i < $c; $i++) {
        $To .= ((isset($exp_toName) && isset($exp_toName[$i])) ? $exp_toName[$i] : $toName) . " <".trim($exp_toEmail[$i]).">";
        if($i < ($c-1)) $To .= ", ";
      }
    } else {
      $To = ((isset($exp_toName) && isset($exp_toName[0])) ? $exp_toName[0] : $toName)." <".$toEmail.">";
    }

    $headers = "Return-Path: <".$get_fromEmail.">\r\n";
    $headers .= "From: ".$fromName." <".$get_fromEmail.">\r\n";
    $headers .= "X-Mailer: Feedback, v0.3 (http://artuelle.com)\r\n";
    $headers .= "X-Priority: 3\r\n";
    $headers .= "Reply-To: ".$fromName." <".$get_fromEmail.">\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/" . $form['cfg']['type'] . "; charset=\"" . $form['cfg']['charset'] . "\"\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";

    $sb['body'] = "";
    if($form['cfg']['tpl']) {
      $out = tpl(array('name' => $act, 'getdata' => $getdata, 'cfg' => $form['cfg']));
      if(is_string($out)) {
        $sb['body'] = $out;
      }
    }

    if(mb_strlen(trim($sb['body'])) < 10) {
      if(isset($form['cfg']['title'])){
        $sb['body'] .= $form['cfg']['title']."\r\n\r\n";
      }

      foreach($getdata as $name => $data) {
        $sb['body'] .= $data['title'].": ".$data['value']."\r\n";
      }

      if($form['cfg']['referer']){
        $sb['body'] .= "\r\n\r\n\r\n\r\n".$ref;
      }
    }

    if(isset($form['cfg']['adds']) && is_array($form['cfg']['adds'])) {
      $sb = adds($sb);
    }

    $mail = mail($To, $sb['subject'], $sb['body'], $headers);

    if($mail) {
      $jsonBox['ok'] = 1;
      $info[] = $form['cfg']['okay'];
    } else {
      $info[] = $form['cfg']['fuck'];
    }
  }
} else {
  $error[] = 'Нет настроек формы с именем #'.$act;
}

if(count($error) > 0) {
  $jsonBox['errors'] = $error;
}

if(count($info) > 0) {
  $jsonBox['infos'] = $info;
}

die(json_encode($jsonBox));

function adds($vars) {
  global $form;
  $adds = $form['cfg']['adds'];
  foreach($adds as $key => $opts) {
    if(is_string($key)) {
      $one = array();
      $two = array();
      foreach($opts as $i => $val) {
        if(isset($_POST[$val])) {
          $one[] = '%%'.$val.'%%';
          $two[] = $_POST[$val];
          }
      }
      $vars[$key] = str_replace($one, $two, $vars[$key]);
    }
  }
  return $vars;
}

function tpl($vars) {
  $tpl = $vars['name'].'.tpl';
  if(file_exists($tpl)) {
    $template = file_get_contents($tpl);
    foreach($vars['getdata'] as $name => $data) {
      $template = str_replace(array("%%".$name.".title%%", "%%".$name.".value%%"), array($data['title'], $data['value']), $template);
    }
    return $template;
  } else {
    return false;
  }
}
