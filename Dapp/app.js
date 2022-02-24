if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
}

let saving_accounts = []; 
const GetCurrentEthAccount01 = document.querySelector('.GetCurrentEthAccount01');
const GetCurrentEthAccount02 = document.querySelector('.GetCurrentEthAccount02');
const GetAccountBalance = document.querySelector('.GetAccountBalance');

GetCurrentEthAccount01.addEventListener('click', () => {
  //Will Start the metamask extension
  ethereum.request({ method: 'eth_requestAccounts' });
  getAccount();
});

GetCurrentEthAccount02.addEventListener('click', () => {
  //Will Start the metamask extension
  ethereum.request({ method: 'eth_requestAccounts' });
  getAccount();
});

async function getAccount(){
  saving_accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = saving_accounts[0];
  system_accounts[0] = account;
  $(".showAccount").html(account)
}

ethereum.on('accountsChanged', function (accounts) {
  const account = accounts[0];
  system_accounts[0] = account;
  console.log("changeToaccounts==>",system_accounts[0]);
  $(".showAccount").html(account)
});


GetAccountBalance.addEventListener('click', () => {
  ethereum.request({method: 'eth_getBalance',params: [system_accounts[0],'latest']})
  .then((balance) => $(".showBalance").html(parseInt(balance,16)))
  .catch((error) => console.error);
});


ethereum.on('balancesChanged', function (balances) {
  const balance = parseInt(balances[0]);
  console.log("balanse[0]==>",balance)
  $(".showBalance").html(balance)
});



