
(function() {
    angular.module('app', []) 
    .controller("appCtrl", ["$scope", function($scope) {
        this.estado = 'registro';
        this.nombres = 'julio cesar';
        this.apellidos = 'torres';
        this.usuario = 'jtorres';
        this.saldo = '';
        this.saldo_apuesta = '';
        this.meta = 5000;
        this.historial = [];
        this.toggleMenu = () => {
            $('.ui.sidebar').sidebar('toggle');
        };
        this.iniciar = () => {
            if(!/^([A-Za-z]{1,}[A-Za-z ]){1,5}[A-Za-z]{1,}$/.test(this.nombres)) {
                alert("Digite un nombre valido");
                return;
            }
            if(!/^([A-Za-z]{1,}[A-Za-z ]){1,5}[A-Za-z]{1,}$/.test(this.apellidos)) {
                alert("Digite un apellido valido");
                return;
            }
            if(!/^[A-Za-z\_]{1,}$/.test(this.usuario)) {
                alert("Digite un nombre de usuario valido");
                return;
            }
            this.estado = 'juego';
            this.saldo = 1000;
            this.resultados = [];
            this.saldo_apuesta = '';
        };
        this.cancelar = () => {
            this.nombres = '';
            this.apellidos = '';
            this.usuario = '';
            this.estado = 'registro';
        };
        this.historico = () => {
            this.estado = 'historico';
        };
        this.apostar = () => {
            if(!/^[0-9]{1,}$/.test(this.saldo_apuesta)) {
                alert('Digita una cantidad valida');
                return;
            }
            this.saldo = parseInt(this.saldo);
            this.saldo_apuesta = parseInt(this.saldo_apuesta);
            if(this.saldo < this.saldo_apuesta) {
                alert('No tienes saldo suficiente');
                return;
            }
            var result = Math.random();
            var row = {
                numero: this.resultados.length + 1,
                ganaste: result > 0.5 ? 'Ganaste': 'Perdiste',
                numero_aleatorio: result,
                apuesta: this.saldo_apuesta,
                saldo_anterior: this.saldo,
                saldo: (result > 0.5 ? '+': '-') + this.saldo_apuesta,
            };
            if(result > 0.5) {
                this.saldo = this.saldo + this.saldo_apuesta;
                this.saldo_apuesta = '';
                row.llego_meta = this.saldo >= this.meta ? 'Si': 'No';
            } else {
                this.saldo = this.saldo - this.saldo_apuesta;
                this.saldo_apuesta = this.saldo_apuesta * 2;
            }
            row.saldo_resultante = this.saldo;
            this.resultados.push(row);
            if(this.saldo === 0) {
                alert('Te haz quedado sin salgo, el juego se acabo');
                this.historial.push({
                    usuario: this.usuario,
                    nombres: this.nombres,
                    apellidos: this.apellidos,
                    resultado: 'Perdio'
                });
            }
            if(row.llego_meta == 'Si') {
                alert('Llegaste a la meta, el juego se acabo');
                this.historial.push({
                    usuario: this.usuario,
                    nombres: this.nombres,
                    apellidos: this.apellidos,
                    resultado: 'Gano'
                });
            }
        };
        $('.oculto').removeClass('oculto');
    }]);
})();