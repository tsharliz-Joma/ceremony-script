const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
} = require("docx");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "https://ceremony-script.tsharliz.com", // Only allow this domain
    methods: "POST",
    allowedHeaders: ["Content-Type"],
  }),
);

app.post("/generate-doc", async (req, res) => {
  const {
    groomFirstName,
    groomSurname,
    brideFirstName,
    brideSurname,
    date,
    venue,
    witnessOne,
    witnessTwo,
    vowsGroom,
    vowsBride,
    groomsmenSong,
    bridesmaidSong,
    bridesFather,
  } = req.body;

  if (
    !groomFirstName ||
    !groomSurname ||
    !brideFirstName ||
    !brideSurname ||
    !date ||
    !venue
  ) {
    return res.status(400).json({error: "Missing required fields"});
  }

  // Construct the ceremony script document
   const doc = new Document({
     sections: [
       {
         properties: {},
         children: [
           new Paragraph({
             children: [
               new TextRun({
                 text: `Ceremony Script`,
                 bold: true,
                 size: 48,
                 font: "Century Gothic",
               }),
             ],
             alignment: AlignmentType.CENTER,
             heading: HeadingLevel.TITLE,
           }),

           new Paragraph({
             text: `${brideFirstName} and ${groomFirstName} ${groomSurname}`,
             spacing: {after: 300},
             bold: true,
             alignment: AlignmentType.CENTER,
           }),

           new Paragraph({
             text: `${date}`,
             spacing: {after: 200},
             alignment: AlignmentType.CENTER,
           }),

           new Paragraph({
             text: `Housekeeping`,
             spacing: {after: 200},
             bold: true,
             size: 36,
             alignment: AlignmentType.LEFT,
           }),

           new Paragraph({
             text: `Good afternoon, everyone. I hope you're all enjoying this wonderful day. Before we commence today's ceremony, I'd like to address a few housekeeping items.`,
             spacing: {after: 200},
           }),

           new Paragraph({
             border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
           }),

           new Paragraph({
             children: [
               new TextRun({
                 text: `Arrivals`,
                 bold: true,
                 size: 36,
                 font: "Century Gothic",
               }),
             ],
             spacing: {after: 200},
           }),

           new Paragraph({
             text: `${groomFirstName} arrives with the groomsmen. Song: ${
               groomsmenSong || "Not Specified"
             }`,
             spacing: {after: 200},
           }),

           new Paragraph({
             text: `Bridesmaid Song: ${bridesmaidSong || "Not Specified"}`,
             spacing: {after: 200},
           }),

           new Paragraph({
             text: `May everyone please stand for the bride`,
             spacing: {after: 200},
             bold: true,
             alignment: AlignmentType.CENTER,
           }),

           new Paragraph({
             border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
           }),

           new Paragraph({
             text: `Giving Away`,
             spacing: {after: 200},
             bold: true,
             size: 36,
           }),

           new Paragraph({
             text: `${bridesFather} will be walking ${brideFirstName} down the aisle.`,
             spacing: {after: 200},
             bold: true,
           }),

           new Paragraph({
             text: `${bridesFather}, as ${brideFirstName}’s father, guardian angel, and protector, do you give ${brideFirstName}’s hand to ${groomFirstName} today?`,
             spacing: {after: 200},
           }),

           new Paragraph({
             border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
           }),

           new Paragraph({
             text: `The Monitum`,
             spacing: {after: 200},
             bold: true,
             size: 36,
             alignment: AlignmentType.CENTER,
           }),

           new Paragraph({
             text: `"I am duly authorised by law to solemnise marriages according to law. Before you are joined in marriage in my presence and in the presence of these witnesses, I am to remind you of the solemn and binding nature of the relationship into which you are now about to enter. Marriage, according to law in Australia, is the union of two people to the exclusion of all others, voluntarily entered into for life."`,
             spacing: {after: 200},
             bold: true,
           }),

           new Paragraph({
             border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
           }),

           new Paragraph({
             text: `The Asking`,
             spacing: {after: 200},
             bold: true,
             size: 36,
             alignment: AlignmentType.CENTER,
           }),

           new Paragraph({
             text: `${groomFirstName}, do you take ${brideFirstName} to be your lawfully wedded wife, to cherish in love and in friendship, with strength and joy, today, tomorrow, and for as long as the two of you shall live?`,
             spacing: {after: 200},
           }),

           new Paragraph({
             text: `${groomFirstName}: "I do"`,
             spacing: {after: 200},
             bold: true,
           }),

           new Paragraph({
             text: `${brideFirstName}, do you take ${groomFirstName} to be your lawfully wedded husband, to cherish through every love ballad, through every adventure you two embark on, today, tomorrow, and for as long as the two of you shall live?`,
             spacing: {after: 200},
           }),

           new Paragraph({
             text: `${brideFirstName}: "I do"`,
             spacing: {after: 200},
             bold: true,
           }),
         ],
       },
     ],
   });

  // Generate the .docx file
  const buffer = await Packer.toBuffer(doc);
  const fileName = `Ceremony Script - ${brideFirstName} and ${groomFirstName} - ${Date.now()}.docx`;

  // Send the file for download
  res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  );
  res.send(buffer);
});

// Start the server
const PORT = process.env.PORT || 5600;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
