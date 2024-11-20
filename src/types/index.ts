export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

//type heredar
export type CartItems = Guitar & {
    quantity : number;
}


//interface heredar
// export interface CartItems extends Guitar {
//     quantity : number;
// }

// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price' > & {
//     quantity: number
// }
// export type CartItem = Omit<Guitar, 'id' | 'name' | 'price' > & {
//     quantity: number
// }

