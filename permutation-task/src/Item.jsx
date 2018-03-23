/* @flow */
import { IdManager } from './IdManager';
import { USE_SACK_ALGORITHM } from './flags';

export default class Item {
    // Hidden input name ($pid-$item)
    name: string;
    // Initial position
    ipos: number;
    // Current position. negative positions belongs to discarted elements
    pos: number;
    // Card content
    content: string;

    // Card
    card: HTMLElement;
    enumeration: HTMLElement;
    contentCard: HTMLElement;
    // Hidden inputs
    iposHiddenInput: HTMLElement;
    posHiddenInput: HTMLElement;

    constructor(ipos: number, name: string, content: string) {

        if(USE_SACK_ALGORITHM && this.ipos < 0) {// if negative then it is a candidate item
            this.ipos = -1; // -1 for all candidate items
        } else this.ipos = ipos;

        this.name = name;
        this.content = content;

        // Current position = initial position
        this.pos = this.ipos;
    }

    get_id() {
        return IdManager.stringify(IdManager.TPL_CARD, this.ipos+'');
    }

    toString() {
        return this.content;
    }

    build() {
        // Building card
        this.enumeration = document.createElement('span')
        //this.enumeration.style.fontWeight = 'bold';
        this.enumeration.style.fontSize = '1.2em';
        this.enumeration.innerHTML = '';
        
        this.contentCard = document.createElement('span')
        this.contentCard.innerHTML = this.content

        this.card = document.createElement('div')
        this.card.setAttribute('class', 'permutation-item')

        var itemContent: HTMLElement = document.createElement('div')
        itemContent.setAttribute('class', 'permutation-item-content')
        itemContent.setAttribute('id', this.get_id())
        itemContent.appendChild(this.enumeration)
        itemContent.appendChild(this.contentCard)

        this.card.appendChild(itemContent)

        // Building hidden inputs
        this.iposHiddenInput = document.createElement('input')
        this.iposHiddenInput.setAttribute('type', 'hidden')
        this.iposHiddenInput.setAttribute('name', IdManager.stringify(IdManager.TPL_HIDDEN_INPUT_IPOS, this.name))
        this.iposHiddenInput.setAttribute('value', this.ipos+'')

        this.posHiddenInput = document.createElement('input')
        this.posHiddenInput.setAttribute('type', 'hidden')
        this.posHiddenInput.setAttribute('name', IdManager.stringify(IdManager.TPL_HIDDEN_INPUT_POS, this.name))
        this.posHiddenInput.setAttribute('value', this.pos+'')
    }

    update_position(pos: number) {
        this.pos = pos;
        this.posHiddenInput.setAttribute('value', this.pos+'')
        
        if(pos > 0) {
            this.enumeration.innerHTML = pos+'. '
        } else {
            this.enumeration.innerHTML = ''
        }
    }

    get_card() {
        return this.card;
    }

    get_iposHiddenInput() {
        return this.iposHiddenInput;
    }

    get_posHiddenInput() {
        return this.posHiddenInput;
    }

    get_y() {
        return this.card.getBoundingClientRect().top;
    }
}