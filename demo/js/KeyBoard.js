(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.returnExports = factory();
  }
}(this, function () {
    var keyBoard = function(options){
        var body = document.getElementsByTagName('body')[0];
        var DIV_ID = options && options.divId || '__w_l_h_v_c_z_e_r_o_divid';
        var INPUT_ID = options && options.inputId || '__w_l_h_v_c_z_e_r_o_inputid';
        var UL_ID = options && options.ulId || '__w_l_h_v_c_z_e_r_o_ulid';
        var TABLE_ID = options && options.table_id || 'table_0909099';
        var symbol = options && options.symbol || '●';
        var maxLength = options && options.maxLength || 6;
        var href = options && options.href || '';

        if(document.getElementById(DIV_ID)){
            body.removeChild(document.getElementById(DIV_ID));
        }
        
        var self = this;
        self.el = document.createElement('div');
        self.el.id = DIV_ID;
        self.el.className = 'keyoard';

        var mobile = typeof orientation !== 'undefined';

        //title
        var title = '<div class="keyoard_hd"><em class="keyoard_close" id="close"></em>输入密码</div>';

        //feild
        var feild = '<div class="keyboard_feild">';
        feild += '<input id="' + INPUT_ID + '" readonly="readonly" type="number" class="keyboard_input"/>'
        feild += '<ul class="pw_list" id="' + UL_ID + '"><li></li><li></li><li></li><li></li><li></li><li></li></ul>';
        feild += '<a href="' + href + '" class="keyboard_find_pwd">忘记密码？</a>';
        feild += '</div>';

        //table
        var tableStr = '<table id="' + TABLE_ID + '" class="keyboard_table" border="0" cellspacing="0" cellpadding="0">';
            tableStr += '<tr><td>1<span style="visibility:hidden;">console style</span></td><td>2<span>ABC</span></td><td>3<span>DEF</span></td></tr>';
            tableStr += '<tr><td>4<span>GHI</span></td><td>5<span>JKL</span></td><td>6<span>MNO</span></td></tr>';
            tableStr += '<tr><td>7<span>PQRS</span></td><td>8<span>TUV</span></td><td>9<span>WXYZ</span></td></tr>';
            tableStr += '<tr><td style="background-color:#D3D9DF;"></td><td>0</td>';
            tableStr += '<td class="del"><span style="visibility:hidden;">删除</span></td></tr>';
            tableStr += '</table>';
        var keyoardBd = document.createElement('div');
        keyoardBd.className = 'keyoard_bd';
        keyoardBd.innerHTML = feild + tableStr;

        self.el.innerHTML = title;
        self.el.appendChild(keyoardBd);
        
        function addEvent(e){
            var ev = e || window.event;
            var clickEl = ev.element || ev.target;
            var value = clickEl.textContent || clickEl.innerText;
            self.input = document.getElementById(INPUT_ID);
            self.pw = document.getElementById(UL_ID).getElementsByTagName('li');
            if(clickEl.tagName.toLocaleLowerCase() === 'td' && value !== "删除"){
                if(self.input && self.input.value.length < maxLength){
                    self.pw[self.input.value.length].innerHTML = symbol;
                    self.input.value = self.input.value + value.substr(0,1);
                    if(options && options.remote && self.input.value.length == maxLength){
                       ajax(options.remote);
                    }
                }
            }else if(clickEl.tagName.toLocaleLowerCase() === 'div' && value === "完成"){
                body.removeChild(self.el);
                body.removeChild(overshade);
            }else if(clickEl.tagName.toLocaleLowerCase() === 'td' && value === "删除"){
                if(self.input && self.input.value.length > 0){
                    self.pw[self.input.value.length - 1].innerHTML = '';
                    self.input.value = self.input.value.substr(0, self.input.value.length - 1);
                }
            }else if(clickEl.tagName.toLocaleLowerCase() === 'em'){
                body.removeChild(self.el);
                body.removeChild(overshade);
            }
        }
         
        function ajax(config) {
            config = config || {};
            config.url = config.url || '';
            config.type = (config.type || "POST").toUpperCase();
            config.data = config.data || {};
            config.dataType = config.dataType || "json";
            config.success = config.success || function (response, xml) {
                console.log('请求成功');
            };
            config.fail = config.fail || function (status) {
                console.log('请求失败,状态吗为' + status);
            };
            var params = formatParams(config.data);
         
            //创建 - 第一步
            if (window.XMLHttpRequest) { //非IE6
                var xhr = new XMLHttpRequest();
            } else { //IE6及其以下版本浏览器
                var xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
         
            //接收 - 第三步
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var status = xhr.status;
                    if (status >= 200 && status < 300) {
                        config.success && config.success(xhr.responseText, xhr.responseXML);
                    } else {
                        config.fail && config.fail(status);
                    }
                }
            }
         
            //连接 和 发送 - 第二步
            if (config.type == "GET") {
                xhr.open("GET", config.url + "?" + params, true);
                xhr.send(null);
            } else if (config.type == "POST") {
                xhr.open("POST", config.url, true);
                //设置表单提交时的内容类型
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(params);
            }
        }

        //格式化参数
        function formatParams(data) {
            var arr = [];
            for (var name in data) {
                arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
            }
            arr.push(("v=" + Math.random()).replace("."));
            return arr.join("&");
        }

        if(mobile){
            self.el.ontouchstart = addEvent;
        }else{
            self.el.onclick = addEvent;
        }
        body.appendChild(self.el);
    }
    return keyBoard;
}));
