export default function RandomColorSetter(passedId) {
  const hashToColor = (id, lightness = 50, opacity = 0.6) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = ((hash % 360) + ((id.length * 37) % 360)) % 360;
    return `hsla(${hue}, 70%, ${lightness}%, ${opacity})`;
  };

  const backgroundColor = hashToColor(passedId, 40, 0.6);
  const textColor = hashToColor(passedId, 90, 1.0);
  return { backgroundColor, textColor };
}
