export class EhMemo {
	constructor() {
		this.cards = document.querySelectorAll(".card");
		this.hasFlippedCard = false;
		this.firstCard = null;
		this.secondCard = null;
		this.lockBoard = false;
		this.init();
	}
	init() {
		this.shuffle();
		this.cards.forEach((card) => {
			card.addEventListener("click", () => this.flipCard(card));
			this.showFront(card);
		});
	}
	showFront(card) {
		card.classList.add("flip");
		setTimeout(() => {
			card.classList.remove("flip");
		}, 3000);
	}
	flipCard(card) {
		if (this.lockBoard) return;
		card.classList.add("flip");
		if (!this.hasFlippedCard) {
			this.hasFlippedCard = true;
			this.firstCard = card;
			return;
		}
		this.secondCard = card;
		this.hasFlippedCard = false;
		this.checkForMatch();
	}
	checkForMatch() {
		if (this.firstCard.dataset.card === this.secondCard.dataset.card) {
			this.diableCards();
			return;
		}
		this.unflipCards();
	}
	diableCards() {
		this.firstCard.removeEventListener("click", () => this.flipCard);
		this.secondCard.removeEventListener("click", () => this.secondCard);
		this.resetBoard();
	}
	unflipCards() {
		this.lockBoard = true;
		setTimeout(() => {
			this.firstCard.classList.remove("flip");
			this.secondCard.classList.remove("flip");
			this.resetBoard();
		}, 1500);
	}
	resetBoard() {
		[this.hasFlippedCard, this.lockBoard] = [false, false];
		[this.firstCard, this.secondCard] = [null, null];
	}
	shuffle() {
		this.cards.forEach((card) => {
			let randomPosition = Math.floor(Math.random() * 12);
			card.style.order = randomPosition;
		});
	}
}
