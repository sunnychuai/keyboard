
;(function(exports){
	var KeyBoard = function(options){
        var body = document.getElementsByTagName('body')[0];
        var DIV_ID = options && options.divId || '__w_l_h_v_c_z_e_r_o_divid';
        var INPUT_ID = options && options.inputId || '__w_l_h_v_c_z_e_r_o_inputid';
        var UL_ID = options && options.ulId || '__w_l_h_v_c_z_e_r_o_ulid';
        var TABLE_ID = options && options.table_id || 'table_0909099';
        var symbol = options && options.symbol || '●';
        var btn = options && options.btn || false;
        var maxLength = options && options.maxLength || 6;

        if(document.getElementById(DIV_ID)){
            body.removeChild(document.getElementById(DIV_ID));
        }
        
        this.el = document.createElement('div');

        var self = this;
        var mobile = typeof orientation !== 'undefined';

        var zIndex = options && options.zIndex || 1000;
        var width = options && options.width || '100%';
        var height = options && options.height || '376px';
        var fontSize = options && options.fontSize || '27px';
        var backgroundColor = options && options.backgroundColor || '#fff';
        
        this.el.id = DIV_ID;
        this.el.style.position = 'fixed';
        this.el.style.left = 0;
        this.el.style.right = 0;
        this.el.style.bottom = 0;
        this.el.style.zIndex = zIndex;
        this.el.style.width = width;
        this.el.style.height = height;
        this.el.style.fontSize = fontSize;
        this.el.style.backgroundColor = backgroundColor;

        //title
        var title = '<div class="keyoard_hd"><span></span>输入密码</div>';

        //INPUT
        var input = '<div>';
        input += '<input id="' + INPUT_ID + '" readonly="readonly" type="number" class="keyboard_input"/>'
        input += '<ul class="pw_list" id="' + UL_ID + '"><li></li><li></li><li></li><li></li><li></li><li></li></ul>';
        input += '</div>';

        //Button
        var btnStr
        if(!btn){
            btnStr = '';
        }else{
            btnStr = '<div class="btn_c">完成</div>';
        }
        
        //table
        var tableStr = '<table id="' + TABLE_ID + '" class="keyboard_table" border="0" cellspacing="0" cellpadding="0">';
            tableStr += '<tr><td>1<span style="visibility:hidden;">console style</span></td><td>2<span>ABC</span></td><td>3<span>DEF</span></td></tr>';
            tableStr += '<tr><td>4<span>GHI</span></td><td>5<span>JKL</span></td><td>6<span>MNO</span></td></tr>';
            tableStr += '<tr><td>7<span>PQRS</span></td><td>8<span>TUV</span></td><td>9<span>WXYZ</span></td></tr>';
            tableStr += '<tr><td style="background-color:#D3D9DF;"></td><td>0</td>';
            tableStr += '<td class="del"><span style="visibility:hidden;">删除</span></td></tr>';
            tableStr += '</table>';
        this.el.innerHTML = title + input + btnStr + tableStr;
        
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
                }
            }else if(clickEl.tagName.toLocaleLowerCase() === 'div' && value === "完成"){
                body.removeChild(self.el);
            }else if(clickEl.tagName.toLocaleLowerCase() === 'td' && value === "删除"){
                if(self.input && self.input.value.length > 0){
                    self.pw[self.input.value.length - 1].innerHTML = '';
                    self.input.value = self.input.value.substr(0, self.input.value.length - 1);
                }
            }
        }
        
        if(mobile){
            this.el.ontouchstart = addEvent;
        }else{
            this.el.onclick = addEvent;
        }
        body.appendChild(this.el);
    }
	
	exports.KeyBoard = KeyBoard;

})(window);
