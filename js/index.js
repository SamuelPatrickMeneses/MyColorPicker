(function () {

    class RangeListener {
        constructor(temp) {
            this.key = false;
            $(temp).on('mousedown', () => {
                this.key = true;
            });
            temp.on('mouseup', () => {
                this.key = false;
            });
            temp.on('mousemove', () => {
                if (this.key)
                    temp.range();
            });
        }
    }

    class Color {
        constructor(componente, copyButton) {
            this.comp = componente;
            this.copyButton = copyButton;
            this.red = 50;
            this.green = 50;
            this.blue = 50;
            this.update();
        }

        toString() {
            return `#${this.toEx(this.red)}${this.toEx(this.green)}${this.toEx(this.blue)}`;
        }
        toEx(int) {
            var retorno = (+int).toString(16);
            if (int < 16)
                return `0${retorno}`;
            return retorno;
        }
        update() {
            $(this.comp).css({
                'background-color': this.toString()
            });
            this.copyButton.innerText = this.toString();
            console.log(this.toString());
        }
        setColor(index, value) {
            if (Number(index) === 0) {
                this.red = value;
                return;
            }
            if (Number(index) === 1) {
                this.green = value;
                return;
            }
            if (Number(index) === 2)
                this.blue = value;
        }
    }

    function rgbConfig(temp, campo){
        temp.attr('min', 0);
        temp.attr('max', 255);
        campo.attr('min',0);
        campo.attr('max',255);
        campo.attr('pattern','^(((\\d)|(\\d\\d))|(([0-2][0-4][0-9])|([2][5][0-5])))$');
        campo.rgb = '^(((\\d)|(\\d\\d))|(([0-2][0-4][0-9])|([2][5][0-5])))$';
    }

    function initCard(card) {
        let content = $(card).find('div.CI div.row.nbb');
        console.log(content);
        let color = card.children[0].children[0];
        let copyButton = card.children[0].children[0].children[0].children[0].children[1];
        console.log(copyButton);
        color.colirListener = new Color(color, copyButton);
        content.each(function (i, e) {
            let temp = $(e).find('div.rotatable input');
            let campo = $(e).find('div.col.s12.m12.l12 input');
            rgbConfig(temp,campo);
            temp.rangeListener = new RangeListener(temp);
            temp.range = function () {
                campo.val(temp.val());
                color.colirListener.setColor(i, temp.val());
                color.colirListener.update();
            };
            campo.val(temp.val());
            campo.on('blur', function () {
                let rg = new RegExp(campo.rgb);
                if(!rg.test(campo.val()))
                    campo.val(0);
                temp.val(campo.val());
                color.colirListener.setColor(i, campo.val());
                color.colirListener.update();
            });
            campo.on('keydown',(e) =>{
                if(e.which === 13)
                    $(campo).blur();
            });
        });
    }

    function initInputs() {

        let paleta = $('#paleta');
        paleta.append(paleta.html());
        paleta.append(paleta.html());
        let cards = document.querySelectorAll('div.card.row');
        initCard(cards[0]);
        initCard(cards[1]);
        initCard(cards[2]);
        initCard(cards[3]);
    }

    window.addEventListener('load', function () {
        /*$("#cabeçalho").load('header.html');
        $("#rodapé").load('footer.html');
        $("#main").load('home.html');*/
        $(document).ready(function () {
            $('select').formSelect();
            initInputs();
        });
    });


}());