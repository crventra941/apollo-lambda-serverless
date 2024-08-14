

/**
 * Generates a Dynamic Mongo Id and returns it
 * generateId()
 *
 * @returns {string}
 */
export const generateId = (): string  => {
    const timestamp = (Math.floor(new Date().getTime() / 1000)).toString(16);
    const random = 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
    });

    return timestamp + random;
}