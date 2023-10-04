export default function TOCItem({date}) {
    return (
        <>
            <li>
                <h2>
                    <a href={"#" + date} className="tocitem">
                        {date.slice(0, 2) + "/" + date.slice(2, 4) + "/" + date.slice(4, 6)}
                    </a>
                </h2>
            </li>
        </>
    );
}