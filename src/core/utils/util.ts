export const handlerName = (CompleteName: string): string => {
    const [name, lastName] = CompleteName.split(" ");
    
    return `${name} ${lastName ? lastName : ""}`;
}