import React from "react";
import Description from "./Description";
import Attachments from "./Attachments";
import Checklist from "./Checklist";
import Comments from "./Comments";
import ViewHeadline from "@material-ui/icons/ViewHeadline";
import Attachment from "@material-ui/icons/Attachment";
import CheckBox from "@material-ui/icons/CheckBox";
import Comment from "@material-ui/icons/Comment";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import ContentSection from "./ContentSection";

const Content = () => {
  return (
    <>
      <ContentSection title="Description" Icon={ViewHeadline}>
        <Description />
      </ContentSection>
      <ContentSection title="Attachments" Icon={Attachment}>
        <Attachments />
      </ContentSection>
      <ContentSection title="Checklist" Icon={CheckBox}>
        <Checklist />
      </ContentSection>
      <ContentSection title="Add Comment" Icon={Comment}>
        <Comments />
      </ContentSection>
      <ContentSection title="Activity" Icon={FormatListBulleted}>
        <div />
      </ContentSection>
    </>
  );
};

export default Content;
