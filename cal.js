const state = {
    bill: 0,          
    tipPercent: 18,   
    guests: 1         
  };

  const billInput     = document.getElementById('bill-input');
  const customTipInput= document.getElementById('custom-tip');
  const customWrap    = document.getElementById('custom-wrap');
  const guestsCount   = document.getElementById('guests-count');
  const guestsDown    = document.getElementById('guests-down');
  const guestsUp      = document.getElementById('guests-up');
  const tipAmountEl   = document.getElementById('tip-amount');
  const totalAmountEl = document.getElementById('total-amount');
  const perPersonEl   = document.getElementById('per-person');
  const resetBtn      = document.getElementById('reset-btn');
  const tipBtns       = document.querySelectorAll('.tip-btn[data-tip]');
  
   /**
     * @param {number} bill 
     * @param {number} pct 
     * @returns {number} 
 */
   
  function calcTip(bill, pct) {
    return bill * (pct / 100);
  }

  /**
    *@param {number} value
    *@returns {string} 
    */

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  function render() {
    const tip      = calcTip(state.bill, state.tipPercent);
    const total    = state.bill + tip;
    const perPerson= total / state.guests;

    function animateUpdate(el, text) {
      el.classList.remove('flash');
      void el.offsetWidth;
      el.textContent = text;
      el.classList.add('flash');
    }

    animateUpdate(tipAmountEl,  formatCurrency(tip));
    animateUpdate(totalAmountEl, formatCurrency(total));
    animateUpdate(perPersonEl,  formatCurrency(perPerson));

    guestsCount.textContent = state.guests;

    guestsDown.disabled = state.guests <= 1;
  }

  billInput.addEventListener('input', () => {
    state.bill = parseFloat(billInput.value) || 0;
    render();
  });

  tipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.tipPercent = parseFloat(btn.dataset.tip);

      tipBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      customWrap.classList.remove('active');
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      customTipInput.value = '';
      render();
    });
  });

  customTipInput.addEventListener('input', () => {
    const val = parseFloat(customTipInput.value);
    if (!isNaN(val) && val >= 0) {
      state.tipPercent = val;

      tipBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      customWrap.classList.add('active');
      render();
    }
  });

  guestsUp.addEventListener('click', () => {
    state.guests = Math.min(state.guests + 1, 500); 
    render();
  });

  guestsDown.addEventListener('click', () => {
    state.guests = Math.max(state.guests - 1, 1); 
    render();
  });

  resetBtn.addEventListener('click', () => {
    state.bill = 0;
    state.tipPercent = 18;
    state.guests = 1;

    billInput.value = '';
    customTipInput.value = '';

    tipBtns.forEach(btn => {
      const isDefault = btn.dataset.tip === '18';
      btn.classList.toggle('active', isDefault);
      btn.setAttribute('aria-pressed', isDefault ? 'true' : 'false');
    });
    customWrap.classList.remove('active');

    render();
  });


  render();