
import { TabPanel } from "@wordpress/components";
import breakpoints from "../breakpoints";

const tabs = Object.keys(breakpoints).map((breakpoint) => ({
    name: breakpoint,
    title: breakpoint.toUpperCase(),
  }));

const BreakpointTabs = ({ children }) => {
    return (
        <TabPanel
        className="breakpoints-tab-panel"
        activeClass="active-tab"
        tabs={tabs}
        >
        {children}
      </TabPanel>
    )
}

export default BreakpointTabs;