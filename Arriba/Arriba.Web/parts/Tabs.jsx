import "./Tabs.scss";

export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const parsedQuery =
            this.props.counts &&
            this.props.counts.parsedQuery;

        const tables =
            this.props.counts &&
                this.props.counts.resultsPerTable ||
            Object.keys(this.props.allBasics).length &&
                Object.map(this.props.allBasics, (k, v) => ({ tableName: k, count: v.rowCount, succeeded: true, locked: true })) ||
            [{ tableName: "Loading...", succeeded: false, locked: true }]; // Solely to prevent jumpy re-layout when allBasics comes in.

        tables.forEach(t => t.canAdminister =
            this.props.allBasics &&
            this.props.allBasics[t.tableName] &&
            this.props.allBasics[t.tableName].canAdminister);

        return <div className="searchBoxAndTabs">
            <div className="tableTabs">
                {tables.map(t => <span
                    key={t.tableName}
                    className={`tableTab ${this.props.currentTable === t.tableName ? "current" : ""} ${t.locked ? "locked" : ""}`}
                    onClick={e => this.props.onSelectedTableChange(t.tableName)}>
                    {t.tableName} <b>{t.allowedToRead === false /* no lock icon if undefined */
                        ? <span className="icon-lock icon" />
                        : t.succeeded ? t.count.toLocaleString() : "‒"}</b>
                    {t.canAdminister && <span className="delete" onClick={e => {
                        e.stopPropagation();
                        xhr(`table/${tableResult.tableName}/delete`)
                            .then(() => this.props.refreshAllBasics(() => {
                                this.props.onSelectedTableChange()
                            }));
                    }}>✕</span>}
                </span>)}
                <span className="tableTabs-fill"></span>
                {parsedQuery && <a title="Explanation" href="#" onMouseOver={e => this.setState({ showExplanation: true })} onMouseOut={e => this.setState({ showExplanation: false })}>
                    <img src="/icons/info.svg" alt="rss"/>
                </a>}
                {this.props.queryUrl && <a title="RSS Link" target="_blank" href={`${this.props.queryUrl}&fmt=rss&t=100&iURL=${encodeURIComponent(this.props.thisUrl + "&open=")}`}>
                    <img src="/icons/rss.svg" alt="rss"/>
                </a>}
                {this.props.queryUrl && <a title="Download CSV" target="_blank" href={`${this.props.queryUrl}&fmt=csv&t=50000`}>
                    <img src="/icons/download.svg" alt="download"/>
                </a>}
                {this.props.query && <a title="Mail" href={
                        "mailto:?subject=" + encodeURIComponent(configuration.toolName)
                        + ": " + encodeURIComponent(this.props.query)
                        + "&body=" + encodeURIComponent(window.location.href)
                    }>
                    <img src="/icons/mail.svg" alt="mail"/>
                </a>}
            </div>
            {this.props.children}
            {this.state.showExplanation && <div className="explanation">
                {parsedQuery || "Explanation"}
            </div>}
        </div>
    }
}
