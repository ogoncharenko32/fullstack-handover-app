const ticketName = (link) => {
  if (!link) return "No link";
  if (link.includes("jira")) {
    const ticketName = link.split("/").pop().split("?")[0];
    return ticketName;
  } else if (link.includes("force.com")) {
    return "SFDC";
  } else if (link.includes("slack")) {
    return "Slack";
  } else if (link.includes("http")) {
    return "Link";
  } else {
    return "";
  }
};

export default ticketName;
