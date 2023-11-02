type EventType = {
    type: EventTypeValue,
    payload: object,
}

export enum EventTypeValue {
    route = 'route',
    viewCard = 'viewCard',
    viewCardPromo = 'viewCardPromo',
    purchase = 'purchase',
    addToCart = 'addToCart',
}

const apiUrl = '/api/sendEvent';
const apiMethod = 'POST';

class EventService {
    send(event: EventType) {
        try{ fetch(apiUrl, {
                    method: apiMethod,
                    body: JSON.stringify({timestamp: Date.now(), ...event} ),
                },
            )
                .then(res => res.json())
                .then(data => console.log(data));
        } catch (error) {
            console.error("Ошибка:", error);
        }
    }
}

export const eventService = new EventService();
