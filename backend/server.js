const express = require("express");
const cors = require("cors");
const styles = require("./styles");
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
    styles: {
      default: {
        document: {
          run: {
            font: styles.FONT,
            size: styles.SIZES.small,
          },
          paragraph: {
            spacing: {after: styles.SPACING.afterHeader},
          },
        },
      },
    },
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: `Ceremony Script`,
                bold: true,
                size: styles.SIZES.title,
                font: styles.FONT,
              }),
            ],
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.TITLE,
          }),

          new Paragraph({
            bold: true,
            text: `${groomFirstName} ${groomSurname} + ${brideFirstName} ${brideSurname}`,
            spacing: {after: styles.SPACING.afterTitle},
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({
            text: `${date}`,
            spacing: {after: styles.SPACING.afterHeader},
            alignment: AlignmentType.CENTER,
          }),

          // Housekeeping
          new Paragraph({
            text: `Housekeeping`,
            bold: true,
            size: styles.SIZES.sectionHeader,
            alignment: AlignmentType.CENTER,
            color: styles.COLORS.title,
          }),
          new Paragraph({
            text: `Good afternoon, everyone. I hope you're all enjoying this wonderful day. Before we commence today's ceremony, I'd like to address a few housekeeping items.`,
            spacing: {after: styles.SPACING.afterHeader},
          }),

          // HR Line
          new Paragraph({
            border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
            spacing: {after: styles.SPACING.afterTitle},
          }),

          // Giving Away
          new Paragraph({
            text: `Giving Away`,
            bold: true,
            size: styles.SIZES.sectionHeader,
          }),
          new Paragraph({
            text: `${bridesFather} will be walking ${brideFirstName} down the aisle.`,
            spacing: {after: styles.SPACING.afterHeader},
            bold: true,
          }),
          new Paragraph({
            text: `${bridesFather}, as ${brideFirstName}’s father, guardian angel and protector, do you give ${brideFirstName}’s hand to ${groomFirstName} today?`,
            spacing: {after: styles.SPACING.afterHeader},
          }),

          // HR Line
          new Paragraph({
            border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
            spacing: {after: styles.SPACING.afterTitle},
          }),

          // Welcome
          new Paragraph({
            text: `Welcome`,
            bold: true,
            size: styles.SIZES.sectionHeader,
          }),
          new Paragraph({
            text: `Thank you all for being here to celebrate and support ${brideFirstName} and ${groomFirstName}. Today marks the beginning of their next chapter together.`,
            spacing: {after: styles.SPACING.afterHeader},
          }),

          // Prayer
          new Paragraph({
            text: `Prayer`,
            bold: true,
            size: styles.SIZES.sectionHeader,
          }),
          new Paragraph({
            text: `Lord Jesus, we thank you for bringing ${brideFirstName} and ${groomFirstName} together. May their love continue to grow, and may their marriage be blessed with strength, faith, and commitment.`,
            spacing: {after: styles.SPACING.afterHeader},
          }),

          // HR Line
          new Paragraph({
            border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
            spacing: {after: styles.SPACING.afterTitle},
          }),

          // Story of the Couple
          new Paragraph({
            text: `Story of ${brideFirstName} & ${groomFirstName}`,
            bold: true,
            size: styles.SIZES.text,
          }),
          new Paragraph({
            text: `2016, a sunny day, a class comedian, and a sporty spice. Who would have known this beautiful combination would bring us all here today?`,
            spacing: {after: styles.SPACING.afterHeader},
          }),

          // HR Line
          new Paragraph({
            border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
            spacing: {after: styles.SPACING.afterTitle},
          }),

          // Monitum
          new Paragraph({
            text: `The Monitum`,
            bold: true,
            size: styles.SIZES.text,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `"I am duly authorised by law to solemnise marriages according to law. Before you are joined in marriage in my presence and in the presence of these witnesses, I am to remind you of the solemn and binding nature of the relationship into which you are now about to enter."`,
            spacing: {after: styles.SPACING.afterHeader},
            bold: true,
          }),

          // HR Line
          new Paragraph({
            border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
            spacing: {after: styles.SPACING.afterTitle},
          }),

          // Legal and Personal Vows (Nested Format)
          new Paragraph({
            text: `~ ${groomFirstName}`,
            bold: true,
            size: styles.SIZES.text,
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: `${groomFirstName}, do you take ${brideFirstName}, to be your lawfully wedded wife, to cherish in love and in friendship, with strength and joy, today, tomorrow, and for as long as the two of you shall live?`,
            spacing: {after: styles.SPACING.afterHeader},
          }),
          new Paragraph({
            text: `${groomFirstName}: "I do"`,
            spacing: {after: styles.SPACING.afterHeader},
            bold: true,
          }),

          new Paragraph({
            text: `${groomFirstName}'s Personal Vows + Legal Vows`,
            spacing: {after: styles.SPACING.afterHeader},
            bold: true,
          }),
          new Paragraph({
            text: `"${vowsGroom}"`,
            spacing: {after: styles.SPACING.afterHeader},
            italic: true,
          }),

          new Paragraph({
            text: `I call upon the persons here present`,
            spacing: {after: styles.SPACING.afterHeader},
          }),
          new Paragraph({
            text: `to witness that I, ${groomFirstName} ${groomSurname},`,
            spacing: {after: styles.SPACING.afterHeader},
          }),
          new Paragraph({
            text: `take thee, ${brideFirstName} ${brideSurname}, to be my lawful wedded wife.`,
            spacing: {after: styles.SPACING.afterHeader},
            bold: true,
          }),

          // HR Line
          new Paragraph({
            border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
            spacing: {after: styles.SPACING.afterTitle},
          }),

          new Paragraph({
            text: `~ ${brideFirstName}`,
            bold: true,
            size: styles.SIZES.text,
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: `${brideFirstName}, do you take ${groomFirstName}, to be your lawfully wedded husband, to cherish through every love ballad, through every adventure you two embark on, today, tomorrow and for as long as the two of you shall live?`,
            spacing: {after: styles.SPACING.afterHeader},
          }),
          new Paragraph({
            text: `${brideFirstName}: "I do"`,
            spacing: {after: styles.SPACING.afterHeader},
            bold: true,
          }),

          new Paragraph({
            text: `${brideFirstName}'s Personal Vows + Legal Vows`,
            spacing: {after: styles.SPACING.afterHeader},
            bold: true,
          }),
          new Paragraph({
            text: `"${vowsBride}"`,
            spacing: {after: styles.SPACING.afterHeader},
            italic: true,
          }),

          new Paragraph({
            text: `I call upon the persons here present`,
            spacing: {after: styles.SPACING.afterHeader},
          }),
          new Paragraph({
            text: `to witness that I, ${brideFirstName} ${brideSurname},`,
            spacing: {after: styles.SPACING.afterHeader},
          }),
          new Paragraph({
            text: `take thee, ${groomFirstName} ${groomSurname}, to be my lawful wedded husband.`,
            spacing: {after: styles.SPACING.afterHeader},
            bold: true,
          }),

          // HR Line
          new Paragraph({
            border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
            spacing: {after: styles.SPACING.afterTitle},
          }),

          // Pronouncement
          new Paragraph({
            text: `Pronouncement`,
            bold: true,
            size: styles.SIZES.text,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `Friends and family, through the vows they have shared and the rings they have exchanged, ${groomFirstName} and ${brideFirstName} have united their lives in the sacred bond of marriage.`,
            spacing: {after: styles.SPACING.afterHeader},
          }),

          new Paragraph({
            text: `You may now kiss the bride!`,
            spacing: {after: 400},
            bold: true,
          }),

          // HR Line
          new Paragraph({
            border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
            spacing: {after: styles.SPACING.afterTitle},
          }),

          // Presentation
          new Paragraph({
            text: `Presentation`,
            bold: true,
            size: styles.SIZES.text,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `Ladies and gentlemen, it gives me great pleasure to present to you for the first time as a married couple, Mr. and Mrs. ${groomSurname}!`,
            spacing: {after: 400},
            bold: true,
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
    ],
  });

  // Generate the .docx file
  const buffer = await Packer.toBuffer(doc);
  const fileName = `Ceremony Script - ${brideFirstName} and ${groomFirstName}.docx`;

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
