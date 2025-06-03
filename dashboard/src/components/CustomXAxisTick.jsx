const CustomXAxisTick = ({ x, y, payload }) => {
    const text = payload.value
    const lineHeight = 18
    const maxCharsPerLine = 15

    const getLines = (text, maxChar) => {
        const words = text.split(' ')
        const lines = []
        let currentLine = ''

        words.forEach(word => {
            if (currentLine.length + (currentLine ? 1 : 0) + word.length > maxChar && currentLine !== '') {
                lines.push(currentLine)
                currentLine = word
            } else {
                currentLine += (currentLine ? ' ' : '') + word
            }
        });

        lines.push(currentLine)
        
        return lines
    };

    const lines = getLines(text, maxCharsPerLine)

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={24} dy={16} textAnchor="middle" fill="#666">
                {lines.map((line, i) => (
                    <tspan key={i} x={0} dy={i === 0 ? 0 : lineHeight}>
                        {line}
                    </tspan>
                ))}
            </text>
        </g>
    );
}

export default CustomXAxisTick