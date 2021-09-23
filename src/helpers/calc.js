export const calcSubPrice = (newPet) => {
    return newPet.count * newPet.pet.price
} 

export const calcTotalPrice = (pets) => {
    let totalPrice = 0
    pets.forEach(item=> {
        totalPrice += item.subPrice
    })
    return totalPrice
}