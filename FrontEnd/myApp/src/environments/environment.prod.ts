export const environment = {
    production: true,
    backend: {
      protocol: 'http',
      host: 'localhost',
      port: '3000',
      endpoints: {
        allCards: '/cards',
        randomCard: '/cards/random',
        cardByName: '/cards/name',
        allEmotes: '/emotes',
        randomEmote: '/emotes/random',
        emoteById: '/emotes/id',
      }
    }
  };
  