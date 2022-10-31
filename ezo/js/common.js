;(function($, window, document, undefined) {
  "use-strict";

  $(window).on('load', function() {

    var block_text = $('.mti-text').remove();
    var block_info_videochat = $('.mt-info-videochat').remove();
    var block_description = $('.mt-description').remove();
    var codeCountry = {
      "au": "0061", "at": "0043", "az": "00994", "al": "00355", "dz": "00213", "ad": "00376", "ar": "0054", "am": "00374", "af": "0093", "bs": "001242", "by": "00375", "be": "0032", "bg": "00359", "br": "0055", "va": "003906682", "gb": "0044", "hu": "0036", "vn": "0084", "de": "0049", "gi": "00350",  "hk": "00852", "gl": "00299", "gr": "0030",
      "ge": "00995", "dk": "0045", "do": "001", "eg": "0020", "il": "00972", "in": "0091", "id": "0062", "jo": "00962", "iq": "964", "ir": "098", "ie": "00353", "is": "00354", "es": "0034", "it": "0039", "kz": "0077","ca": "001", "cy": "00357", "kg": "00996", "cn": "0086", "la": "00856", "lv": "00371", "lb": "00961", "lt": "00370", "li": "00423",
      "lu": "00352", "mu": "00230", "mk": "00389", "my": "0060", "ml": "00223", "mv": "00960", "mt": "00356", "ma": "00212", "mx": "0052", "md": "00373", "mc": "00377", "mn": "00976", "an": "00599", "nl": "0031", "nz": "0064", "no": "0047", "ae": "00971", "pl": "0048", "pt": "00351", "ru": "007", "ro": "0040", "sv": "00503", "rs": "00381",
      "sg": "0065", "sk": "00421", "si": "00386", "us": "001", "tj": "00992", "th": "0066", "tn": "00216", "tm": "00993", "tr": "0090", "uz": "00998", "ua": "00380", "fi": "00358", "fr": "0033", "gf": "00594", "hr": "00385", "cz": "00420","ch": "0041", "se": "0046", "ec": "00593", "ee": "00372", "za": "0027", "jm": "001876", "jp": "0081"
    };
    var tabsHTML = $('.videochat-tab').html();

    // Валидация форм
    $("#reg_form").validate({
       rules: {
        user_name: {
          minlength: 2,
          maxlength: 255
        },
        sex: {
          required: true
        },
        birthday_day: {
          required: true
        },
        birthday_month: {
          required: true
        },
        birthday_year: {
          required: true
        },
        phone_number: {
          required: true
        },
        new_email: {
          maxlength: 128,
          email: true
        },
        new_password: {
          minlength: 6,
          maxlength: 255
        },
        new_login: {
          minlength: 3,
          maxlength: 255
        }
      },
      messages: {
        user_name: {
          minlength: jQuery.validator.format("Слишком короткое имя"),
          maxlength: jQuery.validator.format("Слишком длинное имя"),
          required: "Обязательное поле."
        },
        new_email: {
          maxlength: jQuery.validator.format("Слишком длинный email"),
          required: "Обязательное поле.",
          email: jQuery.validator.format("Неправильный формат email"),
        },
        sex: {
          required: "Необходимо выбрать один из вариантов"
        },
        birthday_day: {
          required: "Необходимо выбрать один из вариантов"
        },
        birthday_month: {
          required: "Необходимо выбрать один из вариантов"
        },
        birthday_year: {
          required: "Необходимо выбрать один из вариантов"
        },
        new_password: {
          required: "Обязательное поле",
          minlength: jQuery.validator.format("Слишком короткий пароль"),
          maxlength: jQuery.validator.format("Слишком длинный пароль"),
        },
        phone_number: {
          required: "Обязательное поле"
        },
        new_login: {
          required: "Обязательное поле",
          minlength: jQuery.validator.format("Слишком короткий логин"),
          maxlength: jQuery.validator.format("Слишком длинный логин"),
        },
      }
    });

    $("#login_form").validate({
      messages: {
        login_email: {
          required: "Обязательное поле."
        },
        login_password: {
          required: "Обязательное поле"
        }
      }
    });

    // Стилизация radio button
    $('.f-field_radio').find('input:checked').parent().addClass('checked');
    $('.f-field_radio label').on('click', function(){
      $('.f-field_radio label').children('input').prop('checked', false);
      $('.f-field_radio label').removeClass('checked');
      $(this).addClass('checked');
      $(this).children('input').prop('checked', true);
    });

    // Стилизация checkbox
    $('.f-field_checkbox label').on('click', function(e){
      e.preventDefault();
      if(!$(this).hasClass('checked')) {
        $(this).addClass('checked');
        $(this).children('input').prop('checked', true);
      } else {
        $(this).removeClass('checked');
        $(this).children('input').prop('checked', false);
      }
    });

    // Инициализация окна видеочата с табом
    $('#videochat_popup').popup({
      opacity: 0.6,
      transition: 'all 0.3s',
      scrolllock: true,
      onopen: function() {
        if($('#videochat_popup .pws_tabs_container').length === 0) {
          matchHandler.mediaMatch('(min-width: 1000px)', function(){
            $('.pws_tabs_horizontal').before('<div class="videochat-tab">' + tabsHTML + '</div>');
            $('.pws_tabs_horizontal').remove();
            $('.videochat-tab').pwstabs({
              effect: 'scale',
              defaultTab: 3,
              containerWidth: '100%',
              theme: '',
              tabsPosition: 'vertical',
              verticalPosition: 'left'
            });
            $('.videochat-item-scroll').jScrollPane({
              autoReinitialise: true
            });
          }, function(){
            $('.pws_tabs_vertical').before('<div class="videochat-tab">' + tabsHTML + '</div>');
            $('.pws_tabs_vertical').remove();
            $('.videochat-tab').pwstabs({
              effect: 'scale',
              defaultTab: 3,
              containerWidth: '100%',
              theme: '',
              tabsPosition: 'horizontal',
              horizontalPosition: 'top'
            });
            $('.videochat-item-scroll').jScrollPane({
              autoReinitialise: true
            });
          });
        }
      },
      closetransitionend: function() {
        $('#videochat_reviews_add_popup').popup('show');
      }
    });

    // Инициализация окна добавления отзыва
    $('#videochat_reviews_add_popup').popup({
      opacity: 0.6,
      transition: 'all 0.3s',
      scrolllock: true,
      beforeopen: function(){
        $('#videochat_popup').popup('hide');
      }
    });

    // Рейтинг в окне добавления отзыва
    $('.rv-rating').on('click', '.rv-star', function(){
      var _this = $(this);
      var number_rating = _this.data('number');
      var rating_stars = $('.rv-rating').find('.rv-star');

      rating_stars.each(function(i){
        rating_stars.removeClass('rv-star-' + (i+1)).addClass('rv-star-empty');
      });

      switch(number_rating) {
        case 1:
          {
            _this.removeClass('rv-star-empty').addClass('rv-star-1');
          }
          break;
        case 2:
          {
            rating_stars.slice(0,1).removeClass('rv-star-empty').addClass('rv-star-1');
            _this.removeClass('rv-star-empty').addClass('rv-star-2');
          }
          break;
        case 3:
          {
            rating_stars.slice(0,2).each(function(i){
              $(this).removeClass('rv-star-empty').addClass('rv-star-' + (i+1));
            });
            _this.removeClass('rv-star-empty').addClass('rv-star-3');
          }
          break;
        case 4:
          {
            rating_stars.slice(0,3).each(function(i){
              $(this).removeClass('rv-star-empty').addClass('rv-star-' + (i+1));
            });
            _this.removeClass('rv-star-empty').addClass('rv-star-4');
          }
          break;
        case 5:
          {
            rating_stars.slice(0,4).each(function(i){
              $(this).removeClass('rv-star-empty').addClass('rv-star-' + (i+1));
            });
            _this.removeClass('rv-star-empty').addClass('rv-star-5');
          }
          break;
      }
    });

    // Инициализация плагина стилизации селекта на странице вопроса
    $('.select_type-2').select2({
      minimumResultsForSearch: Infinity,
      theme: "type-2"
    })

    // Инициализация плагина стилизации селекта в форме регистрации
    $('.select').select2({
      minimumResultsForSearch: Infinity,
      theme: ""
    });

    // Инициализация плагина стилизации селекта с поиском
    $('.select-with-search').select2({
      theme: "search",
      templateSelection: formatState
    });

    // Фиксация ширины выпадающего списка при открытии списка
    $('.select-with-search').on("select2:open", function () {
      $('.select2-dropdown').addClass('select2-countries');
    });

    // Инициализация плагина Mask
    if($('#phone_number').length) {
      $('#phone_number').mask($('#phone_number').val().match(/\+?\d{1,4}/) + ' (000) 000-00-00');
    }

    // Инициализация маски номера телефона при выборе страны
    $('.select-with-search').on("select2:select", function () {
      var _this = $(this);
      $('#phone_number').unmask();
      setTimeout(function(){
        $('#phone_number').mask(getCodeCountry(_this.val()) + ' (000) 000-00-00');
      }, 500);
    });

    // Добавление флага к селекту при выборе
    function formatState(state) {
      var $state = $(
        '<img src="http://astro7.ru/fileadmin/templates/images/flags/'  + state.element.value.toLowerCase() + '.png" width="16" height="11" alt="">'
      );
      return $state;
    };

    // Получение кода страны
    function getCodeCountry(val) {
      var phone = codeCountry[val];
      return '+' + phone.replace(new RegExp(/^(00)/), '');
    }

    // Инициализация слайдера
    $('#slider').slick({
      centerMode: true,
      centerPadding: '20px',
      autoplay: true,
      autoplaySpeed: 6000,
      prevArrow: '<span class="slick-prev"><i class="icon-arrow-left"></i></span>',
      nextArrow: '<span class="slick-next"><i class="icon-arrow-right"></i></span>',
      mobileFirst: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 479,
          settings: {
            centerPadding: '30px',
            arrows: true
          }
        },
        {
          breakpoint: 999,
          settings: {
            centerPadding: 0,
            arrows: true,
            variableWidth: true
          }
        }
      ]
    });

    // Добавление класса к выбранной ранее радио кнопке
    $('.list-radiobutton').find('label').children('input:checked').parent().addClass('selected');

    // Радио кнопки
    $('.list-radiobutton').on('click', 'label', function(){
      $('.list-radiobutton').find('label').removeClass('selected');
      $('.list-radiobutton').find('label').children('input').prop('checked', false);
      $(this).addClass('selected');
      $(this).children('input').prop('checked', true);
    });

    // Удаление фото из списка добавленных в форме добавление данных при заказе чата
    $('.lp-delete-photo').click(function(){
      $(this).parent().fadeOut();
    });

    // Изменение класса главного меню при изменении разрешения экрана
    matchHandler.mediaMatch('(max-width: 999px)', function(){
      $('.h-container').addClass('h-container_sidebar').removeClass('h-container_header');
      $('#header_search').attr('placeholder', 'Поиск');
    }, function(){
      $('.h-container').removeClass('h-container_sidebar').addClass('h-container_header');
      $('#header_search').attr('placeholder', 'Введите имя эксперта, название вебинара, ...');
      if($('body').hasClass('open-sidebar')) {
        $('body').removeClass('open-sidebar');
      }
    });

    // Адаптивный баннер под загловком сайта на главной странице
    matchHandler.mediaMatch('(min-width: 768px)', function(){
      var html = '<div class="mt-inner-block"></div>';
      if(!$('.mt-intro').find('.mt-inner-block').length) {
        $('.mt-intro').append(html);
        $('.mt-inner-block').append(block_text);
        $('.mt-inner-block').append(block_description);
        $('.mt-intro').append(block_info_videochat);
        $('.mt-intro').append('<div class="clear"></div>');
      }
    }, function(){
      $('.mt-inner-block + .mt-info-videochat').remove();
      $('.mt-inner-block, .mt-intro .clear').remove();
      $('.mt-intro').append(block_text);
      $('.m-top-inner').append(block_info_videochat);
      $('.m-top-inner').append(block_description);
    });

    // Открытие бокового меню в мобильно версии
    $('.btn-show-sidebar').on('click', function(){
      $('body').toggleClass('open-sidebar');
    });

    // Позицирнирование блоков с описанием напраленности в главном меню десктопной версии
    $('.h-container_header .hc-menu > ul > li > ul > li:not(:first)').hover(function(){
      $(this).find('ul').css({'top': ($(this).height() + 19)*-1 + 'px'});
    });

    var btns = [$('#search_show'), $('#user_info'), $('#favorite_experts'), $('#incoming_message')],
        blocks = ['.hc-search', '.ui-menu', '.fe-block', '.im-block'];

    blockShow(btns, blocks);

    // Удаление эксперта из списка избранных
    $('.li-close').click(function(){
      $(this).parent().fadeOut();
    });

    // Скролл в блоке избранных экспертов в заголовке сайта
    $('#favorite_experts').click(function(){
      $('#favorite_experts_list').jScrollPane();
    });

    // Скролл в блоке входящих сообщений в заголовке сайта
    $('#incoming_message').click(function(){
      $('#incoming_message_list').jScrollPane();
    });

    toggleMobileMenu();

    // Показ личного кабинета на мобильный устройствах
    $('.h-container_sidebar .hc-link').click(function(e){
      e.preventDefault();
      $(this).parent().toggleClass('show');
      $(this).parent().find('.hc-mobile-menu').slideToggle(100);
    });

    // Адаптивный таб на странице профиля клиента
    var $tabsWrapper = $('.tabs-wrapper'),
        $popupAnswer = $('#popup_answer');

    matchHandler.mediaMatch('(min-width: 768px)', function() {
      $('.is-accordion').off('click', '.t-title');

      $tabsWrapper.addClass('is-tab').removeClass('is-accordion');

      if ($tabsWrapper.find('.t-title.current').length === 0) {
        $tabsWrapper.find('.t-title').removeClass('current');
        $tabsWrapper.find('.t-content').fadeOut(100);
        $tabsWrapper.find('.t-content').css({
          'width': $tabsWrapper.width($tabsWrapper.find('.t-content')) + 'px'
        });
        $tabsWrapper.find('.t-item:first').children('.t-title').addClass('current');
        $tabsWrapper.find('.t-item:first').find('.t-content').show();
      }

      ulHeight($tabsWrapper.find('.t-item:first').children('.t-title'));
      tContentWidth($tabsWrapper.find('.t-item:first').find('.t-content'));

      $tabsWrapper.on('click', '.t-title', function (e) {
        var $ele = $(this);

        // в случае, если вкладка таба используется как ссылка
        if($(e.target).closest('a').length) {
          return;
        }

        $tabsWrapper.find('.t-title').removeClass('current');
        $ele.addClass('current');

        $tabsWrapper.find('.t-content').not($ele.next('.t-content')).hide();

        ulHeight($(this));
        tContentWidth($(this).next('.t-content'));

        $(this).next().show();
        if ($popupAnswer.length && $popupAnswer.is(':visible')) {
          $popupAnswer.hide();
        }
      });
    }, function() {
      $tabsWrapper.off('click', '.t-title');
      $tabsWrapper.find('.t-content').removeAttr('style');
      $tabsWrapper.removeAttr('style');
      $tabsWrapper.addClass('is-accordion').removeClass('is-tab');

      $('.is-accordion').find('.t-title').removeClass('current');
      $('.is-accordion').on('click', '.t-title', function (e) {
        var $ele = $(this);

        //в случае, если вкладка таба используется как ссылка
        if($(e.target).closest('a').length) {
          return;
        }

        $('html, body').animate({scrollTop: $('.tabs-wrapper').offset().top - 20});
        $tabsWrapper.find('.t-title').removeClass('current');
        if ($ele.next('.t-content').is(':hidden')) {
          $ele.addClass('current');
        } else {
          $ele.removeClass('current');
        }
        $tabsWrapper.find('.t-content').not($ele.next('.t-content')).slideUp();
        $ele.next().slideToggle();

        if ($popupAnswer.length && $popupAnswer.is(':visible')) {
          $popupAnswer.hide();
        }
      });
    });

    matchHandler.mediaMatch('(min-width: 1000px)', function(){
      $('.main_questions-page .right-column').css({
        'min-height' : $('.main_questions-page .left-column').innerHeight() + 'px'
      });
    }, function(){});

  });

  // Отображение формы Ответить при клике на ссылку Ответить
  $('.answer-link').click(function(e){
    var _this = $(this);
    e.preventDefault();
    $('#popup_answer').fadeIn();
    $('#popup_answer').css({
      'top': $(this).offset().top + 25 + 'px',
      'left': $(window).width() > 767 ? $(this).offset().left - 80 + 'px' : $(this).offset().left + 'px',
      'width' : $(this).closest('.list-questions_item').innerWidth() + 'px'
    });
  });

  // Отображение формы Комментировать при клике на ссылку Комментировать
  $('.answer-link_comment').click(function(e){
    var _this = $(this);
    e.preventDefault();
    $('#popup_comment').fadeIn();
    $('#popup_comment').css({
      'top': $(this).offset().top + 25 + 'px',
      'left': $(window).width() > 767 ? $(this).offset().left - 80 + 'px' : $(this).offset().left + 'px',
      'width' : $(this).closest('.list-questions_item').innerWidth() + 'px'
    });
  });

  // Скролл к форме Ответить, если она статична (расположена в опредленном месте)
  $('.btn-scroll').click(function(e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $('#popup_answer_single').offset().top - 50
    }, 1000);
  });

  $(window).on('load resize', function(){

    if($('#popup_answer:visible')){
      $('#popup_answer').hide();
    }

    if($('#popup_comment:visible')){
      $('#popup_comment').hide();
    }

    if($(this).width() > 999) {
      var heightFooter = $('footer').innerHeight();
      var heightMain = $('main').innerHeight();
      $('.wrapper').css({'padding-bottom' : heightFooter + 'px'});
      $('footer').addClass('to-bottom');
      sliderArrowPosition();
    } else {
      $('.wrapper').removeAttr('style');
      $('footer').removeClass('to-bottom');
      $('#slider').find('.slick-prev').attr('style', 'display: block');
      $('#slider').find('.slick-next').attr('style', 'display: block');
    }

    ulHeight($('.is-tab').find('.t-item').children('.t-title.current'));
    tContentWidth($('.is-tab').find('.t-item').children('.t-title.current').next('.t-content'));
  });

  if (Modernizr.touch) {
    // Показ tooltip, если есть поддержка touch
    $('.cb-btn b').on('click', function(){
      $('.cbb-tooltip').fadeOut();
      $(this).parent().children('.cbb-tooltip').fadeIn();
      $(this).parent().children('.cbb-tooltip').find('.tooltip-triangel').css({
        'left' : $(this).parent().offset().left + ($(this).parent().width() / 2) - 7 - $(this).parent().children('.cbb-tooltip').offset().left + 'px'
      });
      $(this).parent().children('.line').slideDown();
    });
    // Убирает диагональную линию у иконки при клике
    $('.cb-btn .line').on('click', function(){
      $(this).slideUp();
    });
  } else {
    // Показ tooltip при hover
    $('.cb-btn b').on('mouseenter', function(){
      $(this).parent().children('.cbb-tooltip').fadeIn(100);
    });
    // Показ линии при клике
    $('.cb-btn b').on('click', function(){
      $(this).parent().find('.line').slideDown();
    });
    // Убирает диагональную линию у иконки при клике
    $('.cb-btn .line').on('click', function(){
      $(this).slideUp();
    });
  }

  // Закрытие tooltip
  $('.tooltip-close').click(function(){
    $(this).parent().fadeOut();
  });

  // Выбор категории в сайдбаре
  $('.category-list a').click(function(e){
    e.preventDefault();
    $('.category-list a').removeClass('current');
    $(this).addClass('current');
  });

  // Подсчет количества введенных символов
  if($('.count-letters').length) {
    $('.count-letters').each(function(){
      var _this = $(this),
          max_len = $(this).data('max-length');

      $(this).siblings('input, textarea').on('keyup keydown keypress', function(){
        var counter = max_len - _this.siblings('input, textarea').val().length;
        if($(this).val().length > max_len) {
          $(this).val($(this).val().substr(0, max_len));
          _this.find('.cl-counter').text('0');
        } else {
          _this.find('.cl-counter').text(counter);
        }

        if($(this).val().length >= max_len - 10) {
          _this.addClass('warning');
        } else {
          _this.removeClass('warning');
        }

        if((counter.toString().slice(-1, counter.length) === '2' || counter.toString().slice(-1, counter.length) === '3' || counter.toString().slice(-1, counter.length) === '4') && counter.toString().slice(-2, -1) !== '1') {
          _this.find('.cl-ending').text('а');
        } else {
          _this.find('.cl-ending').text('ов');
        }
      });
    });
  }

  // Высота блока таба на странице профиля клиента
  function ulHeight(block) {
    $('.is-tab').css({
      'height' : block.innerHeight() + block.next('.t-content').innerHeight() + 'px'
    });
  }

  // Ширина контентной части таба на странице профиля клиента
  function tContentWidth(block) {
    block.css({
      'width' : $('.is-tab').width() + 'px'
    });
  }

  // Изменение расположение стрелок слайдера при ресайзе окна
  function sliderArrowPosition() {
    if($('#slider').hasClass('slick-initialized')) {
      $('#slider').find('.slick-prev').css({
        'left' : $('.slick-list').offset().left - 24 + 'px'
      });
      $('#slider').find('.slick-next').css({
        'right' : $('.slick-list').offset().left - 24 + 'px'
      });
    }
  }

  // Показ/скрытие блоков при клике (для поиска, личного кабинета, входящих сообщения, исзбранного в десктопной версии)
  function blockShow(btn_block, block_toggle) {
    $.each(btn_block, function(i){
      $(this).click(function(e){
        var _this = $(this);
        e.preventDefault();
        $(block_toggle.toString()).not($(block_toggle[i])).slideUp(100);
        $.each(btn_block, function(){
          $(this).not(_this).parent().removeClass('active');
        });
        $(this).parent().toggleClass('active');
        $(block_toggle[i]).slideToggle(100);
      });
    });
  }

  // Адаптивное главное меню
  function toggleMobileMenu() {
    var _this = $(this);
    var li_mobile = $('.hc-menu ').find('li');

    if (matchMedia) {
      var mq = window.matchMedia("(min-width: 1000px)");
      mq.addListener(widthChange);
      widthChange(mq);
    }

    function widthChange(media_query){
      li_mobile.each(function(){
        if($(this).hasClass('current') && media_query.matches) {
          $(this).removeClass('current');
        }
        if($(this).children('ul') && media_query.matches) {
          $(this).children('ul').removeAttr('style');
          $(this).find('.icon-arrow-right-small').removeAttr('style');
          $(this).children('a').unbind();
        } else {
          $(this).find('.icon-arrow-right-small').hide();
          if($(this).children('ul').length) {
            $(this).find('.icon-arrow-right-small').show();
            $(this).children('a').bind('click', function(e) {
              e.preventDefault();
              if($(this).next('ul').is(':hidden')){
                $(this).parent().addClass('current');
              }else{
                $(this).parent().removeClass('current');
              }
              $(this).closest('ul').closest('ul').find('ul').not($(this).next('ul')).slideUp().parent().removeClass('current');
              $(this).next().slideToggle();
            });
          }
        }
      });
    }
  }

  // Блок с ссылками
  $('.all-links-to-pages_trigger').click(function(){
    $(this).parent().toggleClass('open');
  });

  $('.all-links-to-pages ul').jScrollPane();

})(jQuery, window, document);

// Media Queries (Аналог CSS Media Queries)
var matchHandler = function() {
  var mediaMatch = function(point, f_true, f_false) {
    var mq = window.matchMedia(point);
    mq.addListener(runFunctions);
    function runFunctions(mq) {
      if (mq.matches) {
        f_true();
      } else {
        f_false();
      }
    }
    runFunctions(mq);
  };
  return { mediaMatch: mediaMatch }
}();

