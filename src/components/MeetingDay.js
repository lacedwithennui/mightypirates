export default function MeetingDay({children, date, description, first}) {
    return (
        <>
            <div id={date} className={"meetingDiv paddedNoTop card" + (first ? " cardMarginNoTop" : "")}>
                <h2 className="meetingH2">{date.slice(0,2)+"/"+date.slice(2,4)+"/"+date.slice(4,6)}</h2>
                {children}
                <p className="article">
                    {description}
                </p>
            </div>
        </>
    )
}