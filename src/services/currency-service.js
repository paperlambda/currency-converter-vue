const getRatesAPI = () => {
    return fetch('https://api.exchangeratesapi.io/latest?base=USD')
      .then(response => response.json())
}

export {
    getRatesAPI
}