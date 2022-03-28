// criando o jogo da velha
const jogoDaVelha = {

    // Atibutos
    tabuleiro: ['', '', '', '', '', '', '', '', ''],
    simbolos: {
        options: ['O', 'X'],
        turn_index: 0,
        change() {
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        }
    },
    container_element: null,
    gameover: false,
    winning_sequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    // FUNCTIONS
    init(container) {
        this.container_element = container;
    },

    make_play(position) {
        if (this.gameover || this.tabuleiro[position] !== '') return false;

        const currentSymbol = this.simbolos.options[this.simbolos.turn_index];
        this.tabuleiro[position] = currentSymbol;
        this.draw();

        const winning_sequences_index = this.check_winning_sequences(currentSymbol);
        if (this.is_game_over()) {
            this.game_is_over();
        }
        if (winning_sequences_index >= 0) {
            this.game_is_over();
            this.stylize_winner_sequence(this.winning_sequences[winning_sequences_index]);
        } else {
            this.simbolos.change();
        }

        return true;
    },

    stylize_winner_sequence(winner_sequence) {
        winner_sequence.forEach((position) => {
            this
                .container_element
                .querySelector(`div:nth-child(${position + 1})`)
                .classList.add('winner');
        });
    },

    check_winning_sequences(symbol) {

        for (i in this.winning_sequences) {
            if (this.tabuleiro[this.winning_sequences[i][0]] == symbol &&
                this.tabuleiro[this.winning_sequences[i][1]] == symbol &&
                this.tabuleiro[this.winning_sequences[i][2]] == symbol) {
                alert('Temos um Vencedor:');
                return i;
            }
        };
        return -1;
    },

    game_is_over() {
        this.gameover = true;
        console.log('FIM DE JOGO');
    },

    is_game_over() {
        return !this.tabuleiro.includes('');
    },

    start() {
        this.tabuleiro.fill('');
        this.draw();
        this.gameover = false;
    },

    restart() {
        if (this.is_game_over() || this.gameover) {
            this.start();
            alert('O jogo recomeçou!')
        } else if (confirm('Você quer recomeçar?')) {
            this.start();
            alert('O jogo recomeçou!')
        }
    },

    draw() {
        this.container_element.innerHTML = this.tabuleiro.map((element, index) => `<div onclick="jogoDaVelha.make_play('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    },
};