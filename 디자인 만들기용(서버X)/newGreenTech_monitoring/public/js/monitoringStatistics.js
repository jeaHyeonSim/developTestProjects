$( document ).ready(function() {
			
    function dailyGraphConfig(dailyData) {
        let config = {
                type: 'bar',
                data: {
                    labels: ["05시","06시", "07시", "08시", "09시", "10시", "11시", "12시", "13시", "14시", "15시", "16시", "17시", "18시", "19시", "20시"], 
                    datasets: [{
                        label: '추적 발전량',
                        fill : true,   
                        backgroundColor: "rgba(255, 148, 54, 0.8)", 
                        data: [23,45,76,34,69,67,87,66],
                    },
                    {
                        label: '고정 발전량',
                        fill : true,   
                        backgroundColor: "rgba(201, 239, 249, 0.8)", 
                        data: [25,43,45,65,45,25,75],
                    },
                    ]
                },
                options: {
                    responsive : false,
                    plugins : {
                        legend :{
                            display : true,
                            labels: {
                                color: '#fff'
                            },
                        },
                    },
                    animation : {
                        duration : 0
                    },
                    animation:false,
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales:{
                        y:{ 
                            title:{
                                display : true,
                                text : "발  전  량 [ K W h ]",
                                font:{
                                    size:12,
                                    weight :'bold', 
                                },
                                color : 'white'
                            },
                            display : true,
                            min : 0,
                            max : 150,
                            ticks :{
                                stepSize : 20,
                                color :  "#fff",
                                font:{
                                    size : 10
                                },
                                padding : 3,
                            },
                            grid: {
                                color : "rgba(132, 133, 142, 0.3)", 
                                drawTicks : false,                     
                            } 
                        },
                        x:{
                            display : true,
                            ticks :{
                                color :  "#fff",
                                font:{
                                    size : 12
                                },
                                padding : 7,
                            },
                        }                  
                    }
                }
            };
        return config;
    };
    
    

    // 그래프 생성
    let dailyChart = function (dailyData){ 
        return new Chart($("#daily-graph"), dailyGraphConfig(dailyData));
    }();
    
    // 발전량 테이블 생성
    function insertDailyTableContent(data) {
        var data01 = data.slice(0,8);
        var data02 = data.slice(8);
        var max = 0;
        var min = 0;

        for (let index = 0; index < data01.length; index++) {
            if(max < parseFloat(data01[index])) max = data01[index];
            if(min > parseFloat(data01[index])) min = data01[index];
        }
        for (let index = 0; index < data02.length; index++) {
            if(max < parseFloat(data02[index])) max = data02[index];
            if(min > parseFloat(data02[index])) min = data02[index];
        }

        for (let index = 0; index < data01.length; index++) {
            if( max == data01[index]) {
                $("#dailyTableData01 td").eq(index).html("<span class='max'>"+(data01[index]).toLocaleString('ko-KR')+"</span>");
                continue;
            }
            if( min == data01[index]) {
                $("#dailyTableData01 td").eq(index).html("<span class='min'>"+(data01[index]).toLocaleString('ko-KR')+"</span>");
                continue;
            } 
            $("#dailyTableData01 td").eq(index).text(data01[index]);
        }
        for (let index = 0; index < data02.length; index++) {
            if( max == data02[index]) {
                $("#dailyTableData02 td").eq(index).html("<span class='max'>"+(data02[index]).toLocaleString('ko-KR')+"</span>");
                continue;
            }
            if( min == data02[index]) {
                $("#dailyTableData02 td").eq(index).html("<span class='min'>"+(data02[index]).toLocaleString('ko-KR')+"</span>");
                continue;
            }
            $("#dailyTableData02 td").eq(index).text(data02[index]);
        }
    
        var sum = data.reduce(function add(sum, curVal){
            return parseFloat((sum) + parseFloat(curVal));
        });
        $("#dailyTableSum").text((sum.toFixed(1)).toLocaleString('ko-KR'));
    }

    

    function getToday() {
        let today = new Date(); 
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() +1)).slice(-2);
        let date = ('0' + today.getDate()).slice(-2);
        return todayAll = year+"-"+month+"-"+date;
    }

    function getDailyData() {

        $.ajax({
                url: '/monitoringStatistics/dailyinfo',
                dataType: 'json',
                type: 'get',
                data: {
                    inverterInfo: $("#inverter").val(),
                    date: $("#daily-date").val(),
                    powerPlant : $("#powerPlant_sel").val()}, 
                success: function(datalist) {

                    // 초기화
                    $("#dailyTableData01 td").empty();
                    $("#dailyTableData02 td").empty();
                    dailyChart.data.datasets = [];  
                    dailyChart.update();
                    if(datalist =="") return;

                    // 전체
                    if($("#inverter").val() =="all") {
                        var colorList = ["yellow","#f1c12f","lightblue"];
                        
                        // 발전량 합계
                        // 5시부터 ~ 20시 까지 초기화.
                        var dailyDataSum =[];
                        for (let index = 0; index < 16; index++) {
                            dailyDataSum.push(0);
                        }
                        var datasetItemList = [];
                        for (let index = 0; index < datalist.length; index++) {

                            // 5시부터 ~ 20시 까지 초기화.
                            var dailyData = [];
                            for (let index = 0; index < 16; index++) {
                                dailyData.push(0);
                            }

                            // 인버터 개수
                            const map = datalist[index];    // 인버터 발전량 전체 데이터
                            var key= Object.keys(map)[0];   // 발전 시간
                            var data = map[key];            // 발전 데이터
                            var lastTime = 0;

                            for (let index = 5; index < 21; index++) {
                                data.forEach((element, index2, array) => {

                                    // 5시부터(4시 최고값이 5시 값임)
                                    if((index-1) == parseInt(element.time) && parseInt(element.time) + 1  <= 20) {
                                        //05시 첫번째 시작인덱스(값을 빼지 않아도 됨)
                                        if(index2 == 0) {
                                                dailyData[(parseInt(element.time)+1)-5] = +(dailyData[(parseInt(element.time)+1)-5] + +element.DYield.toFixed(1)).toFixed(1);
                                                dailyDataSum[(parseInt(element.time)+1)-5] = +(dailyDataSum[(parseInt(element.time)+1)-5] + +element.DYield.toFixed(1)).toFixed(1);
                                        } else {
                                                dailyData[(parseInt(element.time)+1)-5] = +(dailyData[(parseInt(element.time)+1)-5] + +(element.DYield - array[index2-1].DYield).toFixed(1)).toFixed(1);
                                                dailyDataSum[(parseInt(element.time)+1)-5] = +(dailyDataSum[(parseInt(element.time)+1)-5] + +(element.DYield - array[index2-1].DYield).toFixed(1)).toFixed(1);
                                        }
                                        lastTime = parseInt(element.time);
                                    }
                                });
                            }
                            dailyData = dailyData.slice(0, lastTime-3);
                            dailyDataSum = dailyDataSum.slice(0, lastTime-3);
                            datasetItemList.push({
                                                label: $('#inverter option[value='+ key +']').text(),
                                                fill : true,   
                                                backgroundColor: "#e0d6c82b", 
                                                borderColor: colorList[index],  
                                                data: dailyData,
                                            });
                            }

                            dailyChart.options.scales.y.stacked = true;
                            dailyChart.data.datasets = datasetItemList;  
                            dailyChart.update();

                            insertDailyTableContent(dailyDataSum);
                    // 개별
                    } else {
                        var data = datalist;
                        let dailyData = [];
                        var lastTime = 0;
                        for (let index = 0; index < 16; index++) {
                            dailyData.push(0);
                        }

                        for (let index = 5; index < 21; index++) {
                            data.forEach((element, index2, array) => {
                                    if((index-1) == parseInt(element.time) && parseInt(element.time) + 1  <= 20) {
                                        //05시 첫번째 시작인덱스(값을 빼지 않아도 됨)
                                        if(index2 == 0) {
                                            dailyData[(parseInt(element.time)+1)-5] = +(dailyData[(parseInt(element.time)+1)-5] + +element.DYield.toFixed(1)).toFixed(1);
                                        } else {
                                            dailyData[(parseInt(element.time)+1)-5] = +(dailyData[(parseInt(element.time)+1)-5] + +(element.DYield - array[index2-1].DYield).toFixed(1)).toFixed(1);
                                        }
                                    }
                                    lastTime = parseInt(element.time);
                                });
                        }
                        dailyData = dailyData.slice(0, lastTime-3);
                        var datasetItem = [{
                            label: $('#inverter option[value='+ $("#inverter").val() +']').text(),
                            fill : true,   
                            backgroundColor: "#e0d6c82b", 
                            borderColor: 'yellow',  
                            data: dailyData
                        }];
                        dailyChart.data.datasets = datasetItem;
                        dailyChart.update();

                        insertDailyTableContent(dailyData);
                    }
                }, 
                error : function(data, status, err) {}
            });
        }

    

    // ----------- init ----------- 
    $(".weekly-table,.monthly-table").parent().hide();
    $(".weekly-select,.monthly-select").hide();
    $("#daily-graph + p").hide();
    $("#weekly-graph + p").hide();
    $("#monthly-graph + p").hide();

    $.datepicker.regional['ko'] = {
        closeText: '닫기',
        prevText: '이전달',
        nextText: '다음달',
        currentText: '오늘',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        weekHeader: 'Wk',
        dateFormat: 'yy-mm-dd',
        firstDay: 0,
        isRTL: false,
        // duration: 100,
        // showAnim: 'show',
        showMonthAfterYear: true,
        yearSuffix: '년'
    };
      $.datepicker.setDefaults($.datepicker.regional['ko']);

    $("#daily-date").datepicker({
        firstDay: 1,
        nextText: "다음",
        prevText: "이전",
        dateFormat: "yy-mm-dd",
        maxDate: "d",
    });     

   
    
    // monthpicker and year selector start/end year (10 year ago)
    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear - 10;

    var options = {
        startYear: startYear,
        finalYear: currentYear,
        pattern: 'yyyy-mm',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    };
    $('#monthly-date').monthpicker(options);


    // initdate
    //일간 데이트 피커 세팅
    $("#daily-date").val(getToday());

    var toDay = new Date();
    toDay.setDate(toDay.getDate()  - (toDay.getDay() || 7));
    var sun = new Date(toDay.getTime());
    sun.setDate(sun.getDate() + 6);

    var dailytext = $("#daily-date").val().split("-");
    $(".dailytext").text(dailytext[0]+"년 "+dailytext[1]+"월 "+dailytext[2]+"일 ");

    // ----------- event ----------- 

    $( "#changeSearchBound" ).on( "change", function(event) {
        $(".daily-table,.weekly-table,.monthly-table").parent().hide();
        $(".daily-date,.weekly-date,.monthly-date").hide();
        $("."+$(this).val()+"-table").parent().show();
        $("."+$(this).val()+"-date").show();
        
        switch($(this).val()) {
            case 'daily': getDailyData(); break;
            default: break;
        }
    });

    setTimeout(() => {
        getInverterInfo().then(function(data){
            $( "#changeSearchBound" ).trigger("change");
        });
    }, 200);

    $("#inverter, #daily-date, #monthly-date").on("change",function(){
        $( "#changeSearchBound" ).trigger("change");
    });

    // 인버터 선택할 경우에 발생
    $("#inverter").on("change",function(){
        $( "#changeSearchBound" ).trigger("change");
    });

    $("#monthly-date").on("change",function(){
        $(".monthtext").text($(this).val().slice(-2));
    });
    $("#daily-date").on("change",function(){
        var dailytext = $("#daily-date").val().split("-");
        $(".dailytext").text(dailytext[0]+"년 "+dailytext[1]+"월 "+dailytext[2]+"일 ");
    });

});


//===============================================================================================================
// date picer 월
    (function($) {
        var methods = {
        init: function(options) {
            return this.each(function() {
            var
                $this = $(this),
                data = $this.data('monthpicker'),
                year = (options && options.year) ? options.year : (new Date()).getFullYear(),
                settings = $.extend({
                pattern: 'mm/yyyy',
                selectedMonth: null,
                selectedMonthName: '',
                selectedYear: year,
                startYear: year - 10,
                finalYear: year + 10,
                monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                id: "monthpicker_" + (Math.random() * Math.random()).toString().replace('.', ''),
                openOnFocus: true,
                disabledMonths: []
                }, options);

            settings.dateSeparator = settings.pattern.replace(/(mmm|mm|m|yyyy|yy|y)/ig, '');

            // If the plugin hasn't been initialized yet for this element
            if (!data) {

                $(this).data('monthpicker', {
                'target': $this,
                'settings': settings
                });

                if (settings.openOnFocus === true) {
                $this.on('focus', function() {
                    $this.monthpicker('show');
                });
                }

                $this.monthpicker('parseInputValue', settings);

                $this.monthpicker('mountWidget', settings);

                $this.on('monthpicker-click-month', function(e, month, year) {
                $this.monthpicker('setValue', settings);
                $this.monthpicker('hide');
                });

                // hide widget when user clicks elsewhere on page
                $this.addClass("mtz-monthpicker-widgetcontainer");
                $(document).unbind("mousedown.mtzmonthpicker").on("mousedown.mtzmonthpicker", function(e) {
                if (!e.target.className || e.target.className.toString().indexOf('mtz-monthpicker') < 0) {
                    $(this).monthpicker('hideAll');
                }
                });
            }
            });
        },

        show: function() {
            $(this).monthpicker('hideAll');
            var widget = $('#' + this.data('monthpicker').settings.id);
            widget.css("top", this.offset().top + this.outerHeight());
            if ($(window).width() > (widget.width() + this.offset().left)) {
            widget.css("left", this.offset().left);
            } else {
            widget.css("left", this.offset().left - widget.width());
            }
            widget.show();
            widget.find('select').focus();
            this.trigger('monthpicker-show');
        },

        hide: function() {
            var widget = $('#' + this.data('monthpicker').settings.id);
            if (widget.is(':visible')) {
            widget.hide();
            this.trigger('monthpicker-hide');
            }
        },

        hideAll: function() {
            $(".mtz-monthpicker-widgetcontainer").each(function() {
            if (typeof($(this).data("monthpicker")) != "undefined") {
                $(this).monthpicker('hide');
            }
            });
        },

        setValue: function(settings) {
            var
            month = settings.selectedMonth,
            year = settings.selectedYear;

            if (settings.pattern.indexOf('mmm') >= 0) {
            month = settings.selectedMonthName;
            } else if (settings.pattern.indexOf('mm') >= 0 && settings.selectedMonth < 10) {
            month = '0' + settings.selectedMonth;
            }

            if (settings.pattern.indexOf('yyyy') < 0) {
            year = year.toString().substr(2, 2);
            }

            if (settings.pattern.indexOf('y') > settings.pattern.indexOf(settings.dateSeparator)) {
            this.val(month + settings.dateSeparator + year);
            } else {
            this.val(year + settings.dateSeparator + month);
            }

            this.change();
        },

        disableMonths: function(months) {
            var
            settings = this.data('monthpicker').settings,
            container = $('#' + settings.id);

            settings.disabledMonths = months;

            container.find('.mtz-monthpicker-month').each(function() {
            var m = parseInt($(this).data('month'));
            if ($.inArray(m, months) >= 0) {
                $(this).addClass('ui-state-disabled');
            } else {
                $(this).removeClass('ui-state-disabled');
            }
            });
        },

        mountWidget: function(settings) {
            var
            monthpicker = this,
            container = $('<div id="' + settings.id + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" />'),
            header = $('<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all mtz-monthpicker" />'),
            combo = $('<select class="mtz-monthpicker mtz-monthpicker-year" />'),
            table = $('<table class="mtz-monthpicker" />'),
            tbody = $('<tbody class="mtz-monthpicker" />'),
            tr = $('<tr class="mtz-monthpicker" />'),
            td = '',
            selectedYear = settings.selectedYear,
            option = null,
            attrSelectedYear = $(this).data('selected-year'),
            attrStartYear = $(this).data('start-year'),
            attrFinalYear = $(this).data('final-year');

            if (attrSelectedYear) {
            settings.selectedYear = attrSelectedYear;
            }

            if (attrStartYear) {
            settings.startYear = attrStartYear;
            }

            if (attrFinalYear) {
            settings.finalYear = attrFinalYear;
            }

            container.css({
            position: 'absolute',
            zIndex: 999999,
            whiteSpace: 'nowrap',
            width: '250px',
            overflow: 'hidden',
            textAlign: 'center',
            display: 'none',
            top: monthpicker.offset().top + monthpicker.outerHeight(),
            left: monthpicker.offset().left
            });

            combo.on('change', function() {
            var months = $(this).parent().parent().find('td[data-month]');
            months.removeClass('ui-state-active');
            if ($(this).val() == settings.selectedYear) {
                months.filter('td[data-month=' + settings.selectedMonth + ']').addClass('ui-state-active');
            }
            monthpicker.trigger('monthpicker-change-year', $(this).val());
            });

            // mount years combo
            for (var i = settings.startYear; i <= settings.finalYear; i++) {
            var option = $('<option class="mtz-monthpicker" />').attr('value', i).append(i+"년");
            if (settings.selectedYear == i) {
                option.attr('selected', 'selected');
            }
            combo.append(option);
            }
            header.append(combo).appendTo(container);

            // mount months table
            for (var i = 1; i <= 12; i++) {
            td = $('<td class="ui-state-default mtz-monthpicker mtz-monthpicker-month" style="padding:5px;cursor:default;" />').attr('data-month', i);
            if (settings.selectedMonth == i) {
                td.addClass('ui-state-active');
            }
            td.append(settings.monthNames[i - 1]);
            tr.append(td).appendTo(tbody);
            if (i % 3 === 0) {
                tr = $('<tr class="mtz-monthpicker" />');
            }
            }

            tbody.find('.mtz-monthpicker-month').on('click', function() {
            var m = parseInt($(this).data('month'));
            if ($.inArray(m, settings.disabledMonths) < 0) {
                settings.selectedYear = $(this).closest('.ui-datepicker').find('.mtz-monthpicker-year').first().val();
                settings.selectedMonth = $(this).data('month');
                settings.selectedMonthName = $(this).text();
                monthpicker.trigger('monthpicker-click-month', $(this).data('month'));
                $(this).closest('table').find('.ui-state-active').removeClass('ui-state-active');
                $(this).addClass('ui-state-active');
            }
            });

            table.append(tbody).appendTo(container);
            container.appendTo('body');
        },

        destroy: function() {
            return this.each(function() {
            $(this).removeClass('mtz-monthpicker-widgetcontainer').unbind('focus').removeData('monthpicker');
            });
        },

        getDate: function() {
            var settings = this.data('monthpicker').settings;
            if (settings.selectedMonth && settings.selectedYear) {
            return new Date(settings.selectedYear, settings.selectedMonth - 1);
            } else {
            return null;
            }
        },

        parseInputValue: function(settings) {
            if (this.val()) {
                if (settings.dateSeparator) {
                    var val = this.val().toString().split(settings.dateSeparator);
                    if (settings.pattern.indexOf('m') === 0) {
                    settings.selectedMonth = val[0];
                    settings.selectedYear = val[1];
                    } else {
                    settings.selectedMonth = val[1];
                    settings.selectedYear = val[0];
                    }
                }
            }
        }
        };

        $.fn.monthpicker = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.mtz.monthpicker');
        }
        };
    })(jQuery);