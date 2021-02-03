export class Exceptions {
    
    public protocolNotFoundException() {
        console.warn("Warn: please put http or https protocol in the beggining of link string");
            throw new Error("Http/Https Protocol Not Found");
    }
}