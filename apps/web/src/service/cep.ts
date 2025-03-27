interface Address {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
}

export async function getAddress(cep: string) {
  const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

  if (!data.ok) {
    return null
  }

  const result: Address = await data.json()

  return result
}
