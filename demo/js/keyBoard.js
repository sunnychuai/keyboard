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
        var randomName = (new Date).getTime();
        var divID = options && options.divId || 'div_' + randomName;
        var inputID = options && options.inputId || 'input_' + randomName;
        var inputName = options && options.name || 'pay_' + randomName;
        var ulID = options && options.ulId || 'ul_' + randomName;
        var tableID = options && options.tableId || 'table_' + randomName;
        var maxLength = options && options.maxLength || 6;
        var href = options && options.href || '';

        if(document.getElementById(divID)){
            body.removeChild(document.getElementById(divID));
        }
        
        var self = this;
        self.el = document.createElement('div');
        self.el.id = divID;
        self.el.className = 'keyboard';

        var mobile = typeof orientation !== 'undefined';

        var title = '<div class="keyboard_hd"><em class="keyboard_close" id="close"></em>输入密码</div>';
        var feild = '<div class="keyboard_feild">';
        feild += '<input id="' + inputID + '" readonly="readonly" type="number" class="keyboard_input"/>'
        feild += '<ul class="pw_list" id="' + ulID + '"><li></li><li></li><li></li><li></li><li></li><li></li></ul>';
        feild += '<a href="' + href + '" class="keyboard_find_pwd">忘记密码？</a>';
        feild += '</div>';
        var tableStr = '<table id="' + tableID + '" class="keyboard_table" border="0" cellspacing="0" cellpadding="0">';
            tableStr += '<tr><td>1<span style="visibility:hidden;">console style</span></td><td>2<span>ABC</span></td><td>3<span>DEF</span></td></tr>';
            tableStr += '<tr><td>4<span>GHI</span></td><td>5<span>JKL</span></td><td>6<span>MNO</span></td></tr>';
            tableStr += '<tr><td>7<span>PQRS</span></td><td>8<span>TUV</span></td><td>9<span>WXYZ</span></td></tr>';
            tableStr += '<tr><td style="background-color:#D3D9DF;"></td><td>0</td>';
            tableStr += '<td class="del"><span style="visibility:hidden;">删除</span></td></tr>';
            tableStr += '</table>';
        var keyboardBd = document.createElement('div');
        keyboardBd.className = 'keyboard_bd';
        keyboardBd.innerHTML = feild + tableStr;

        self.el.innerHTML = title;
        self.el.appendChild(keyboardBd);
        body.appendChild(self.el);

        if(mobile){
            self.el.ontouchstart = addEvent;
        }else{
            self.el.onclick = addEvent;
        }

        self.inputVal = document.getElementById(inputID).value;
        self.pw = document.getElementById(ulID).getElementsByTagName('li');

        var loading = function () {
            setTimeout(function() {
                var load = document.createElement('div');
                load.id = 'kb_load';
                load.className = 'keyboard_load';
                load.innerHTML = '<div class="loading"><span>正在付款...</span></div>';
                keyboardBd.appendChild(load);
                return load;
            }, 30);
        };

        var removeLoading = function () {
            setTimeout(function() {
                var load = document.getElementById('kb_load') || '';
                keyboardBd.removeChild(load);
            }, 30);
        };

        var toast = function (type, mess, callback) {
            var dialog = document.createElement('div');
            dialog.className = 'keyboard_toast';
            dialog.innerHTML = '<div class="kb_toast_dg">'+mess+'</div>'
            body.appendChild(dialog);
            setTimeout(function() {
                body.removeChild(dialog);
                callback && callback();
            }, 2000);
        };

        var cleanVal = function () {
            self.inputVal = '';
            for (var i = self.pw.length - 1; i >= 0; i--) {
                self.pw[i].innerHTML = "";
            }
        };
    
        function addEvent(e){
            var ev = e || window.event;
            var clickEl = ev.element || ev.target;
            var val = clickEl.textContent || clickEl.innerText;
            var tagNameStr = clickEl.tagName.toLocaleLowerCase();
            self.inputLen = self.inputVal.length;
            tagNameStr === 'td' && val !== "删除" && self.inputLen < maxLength && keyed(val);
            tagNameStr === 'td' && val === "删除" && self.inputLen > 0 && del();
            tagNameStr === 'em' && body.removeChild(self.el);
            ev.preventDefault();
        }

        function keyed(val) {
            self.pw[self.inputLen].innerHTML = '<i></i>';
            self.inputVal = self.inputVal + val.substr(0,1);
            if(options && options.remote && self.inputVal.length == maxLength){
               ajax(options.remote);
            }
        }

        function del() {
            self.pw[self.inputLen - 1].innerHTML = '';
            self.inputVal = self.inputVal.substr(0, self.inputLen - 1);
        }
         
        function ajax(config) {
            config = config || {};
            config.url = config.url || '';
            config.type = (config.type || "POST").toUpperCase();
            config.data = config.data || {};
            config.dataType = config.dataType || "json";
            config.success = config.success || success;
            config.fail = config.fail || fail;
            loading();

            var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            sendXhrRequest(xhr, config.type, config.url, formatParams(config.data));
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var status = xhr.status;
                    removeLoading();
                    if (status >= 200 && status < 300) {
                        config.success && config.success(xhr.responseText, xhr.responseXML);
                    } else {
                        config.fail && config.fail(status);
                    }
                }
            }
        }

        function formatParams(data) {
            var arr = [];
            for (var name in data) {
                arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
            }
            arr.push(inputName + "=" + self.inputVal);
            return arr.join("&");
        }

        function sendXhrRequest(xhr, type, url, params) {
            url = type == "GET" ? url + "?" + params : url;
            xhr.open(type, url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            type == "POST" && xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            params = type == "GET" ? null : params; 
            xhr.send(params);
        }

        function success(response, xml) {
            var data = JSON.parse(response);
            if(data.status !== 0){
                toast('fail', data.message, cleanVal);
                return;
            }
            toast('success', data.message, function () {
                setTimeout(function() {
                    body.removeChild(self.el);
                }, 300);
            });
        }

        function fail(status) {
            toast('fail', '请求失败,状态码为' + status);
        }
    }
    return keyBoard;
}));
