
export interface ButtonProps {
    text: string;
    handler: () => void;
    // tooltip: string;
}
export interface FormProps {
    fName: (name: string) => void
    fDescription: (description: string) => void
}


// export interface FormProps {
//     fName: Dispatch<SetStateAction<string>>;
//     fDescription: Dispatch<SetStateAction<string>>
// }