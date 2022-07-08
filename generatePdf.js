const PDFGenerator = require("pdfkit");
const { once } = require("events");
const fs = require("fs");

class GeneratePDF {
	constructor() {
		this.templatePath = "./templates";
	}

	async generate({ fileName = "example", data = {} } = {}) {
		try {
			if (fs.existsSync(`./${fileName}.pdf`)) {
				fs.unlinkSync(`./${fileName}.pdf`);
			}

			let pdfBufferArray = [];

			const doc = new PDFGenerator({ margin: 10, size: "A4" });

			doc.pipe(fs.createWriteStream(`./${fileName}.pdf`));

			doc.on("data", pdfBufferArray.push.bind(pdfBufferArray));

			doc.image(`${this.templatePath}/img1.jpg`, 0, 15, { width: 590 });

			this.textInRow({
				doc: doc,
				text: `${data.bilheteNR || "{{ BilheteNR }}"
					}`,
				heigth: 253,
				position: 95,
			});
			this.textInRow({
				doc: doc,
				text: `${data.issueDate || "{ { IssueDate } }"} `,
				heigth: 253,
				position: 394,
			});
			this.textInRow({
				doc: doc,
				text: `${data.cpf || "{ { Cpf } }"} `,
				heigth: 282,
				position: 340,
			});
			this.textInRow({
				doc: doc,
				text: `${data.customerName || "{ { customerName } }"} `,
				heigth: 283,
				position: 95,
			});
			this.textInRow({
				doc: doc,
				text: `${data.addressAndNumber || "{ { addressAndNumber } }"} `,
				heigth: 296,
				position: 98,
			});
			this.textInRow({
				doc: doc,
				text: `${data.adressComplement || "{ { adressComplement } }"} `,
				heigth: 311,
				position: 111,
			});
			this.textInRow({ 
				doc, 
				text: `${data.city || "{ { city } }"} `, 
				heigth: 311, 
				position: 310 
			});
			this.textInRow({ 
				doc, 
				text: `${data.state || "{ { state } }"} `, 
				heigth: 311, 
				position: 380 
			});
			this.textInRow({ 
				doc, 
				text: `${data.cep || "{ { cep } }"} `, 
				heigth: 311, 
				position: 470 
			});
			this.textInRow({
				doc: doc,
				text: `${data.samsungModel || "{ { samsungModel } }"} `,
				text: `{ { samsungModel } } `,
				heigth: 370,
				position: 80,
			});
			this.textInRow({
				doc: doc,
				text: `${data.deviceIMEI || "{ { deviceIMEI } }"} `,
				heigth: 385,
				position: 70,
			});
			this.textInRow({
				doc: doc,
				text: `${data.sectionAfrachise || "{ { sectionAfrachise } }"} `,
				heigth: 455,
				position: 35,
			});
			this.textInRow({
				doc: doc,
				text: `${data.sectionarepaircost || "{ { sectionarepaircost } }"} `,
				heigth: 485,
				position: 195,
				size: 10,
			});
			this.textInRow({
				doc: doc,
				text: `${data.sectionApremiumNet || "{ { sectionApremiumNet } }"} `,
				heigth: 510,
				position: 235,
				size: 10,
			});
			this.textInRow({
				doc: doc,
				text: `${data.sectionAiofCoverage || "{ { sectionAiofCoverage } }"} `,
				heigth: 525,
				position: 40,
			});
			this.textInRow({
				doc: doc,
				text: `${data.sectionApremiumGross || "{ { sectionApremiumGross } }"} `,
				heigth: 535,
				position: 190,
			});
			this.textInRow({
				doc: doc,
				text: `${data.sectionBfranchgise || "{ { sectionBfranchgise } }"} `,
				heigth: 580,
				position: 40,
			});
			this.textInRow({
				doc: doc,
				text: `${data.sectionBMaxValue || "{ { sectionBMaxValue } }"} `,
				heigth: 609,
				position: 150,
				size: 10,
			});
			this.textInRow({
				doc: doc,
				text: `${data.sectionBpremiumNet || "{ { sectionBpremiumNet } }"} `,
				heigth: 622,
				position: 235,
				size: 10,
			});
			this.textInRow({
				doc: doc,
				text: `${data.sectionFiofCoverage || "{ { sectionFiofCoverage } }"} `,
				heigth: 634,
				position: 38,
			});
			this.textInRow({
				doc: doc,
				text: `${data.sectionBPremiumGross || "{ { sectionBPremiumGross } }"} `,
				heigth: 645,
				position: 190,
			});
			this.textInRow({
				doc: doc,
				text: `${data.totalPremiumNet || "{ { totalPremiumNet } }"} `,
				heigth: 672,
				position: 195,
				size: 10,
			});
			this.textInRow({
				doc: doc,
				text: `${data.totallof || "{ { totallof } }"} `,
				heigth: 672,
				position: 380,
				size: 10,
			});
			this.textInRow({
				doc: doc,
				text: `${data.totalPremium || "{ { totalPremium } }"} `,
				heigth: 685,
				position: 195,
				size: 10,
			});

			doc.moveDown();

			doc.addPage({ margin: 10, size: "A4" });

			doc.image(`${this.templatePath}/img2.jpg`, 0, 15, { width: 590 });

			this.textInRow({
				doc: doc,
				text: `${data.startDate || "{{ startDate }}"}`,
				heigth: 240,
				position: 150,
			});
			this.textInRow({
				doc: doc,
				text: `${data.endDate || "{{ endDate }}"}`,
				heigth: 240,
				position: 460,
			});
			this.textInRow({
				doc: doc,
				text: `${data.repCredit || "{{ repCredit }}"}`,
				heigth: 268,
				position: 400,
			});
			this.textInRow({
				doc: doc,
				text: `${data.repPercent || "{{ repPercent }}"}`,
				heigth: 285,
				position: 40,
				size: 10,
			});

			fs.readdirSync(`${this.templatePath}`).map((file, indexFilePath) => {
				const imgAlreadyAddedInPdf = [1, 2];
				if (imgAlreadyAddedInPdf.includes((indexFilePath += 1))) {
					return;
				}
				doc.addPage({ margin: 10, size: "A4" });
				doc.image(`${this.templatePath}/${file}`, 0, 15, { width: 590 });
			});

			doc.end();

			await once(doc, "end");

			pdfBufferArray = Buffer.concat(pdfBufferArray);

			return pdfBufferArray.toString("base64");
		} catch (error) {
			console.log({
				message: error.message || error,
				stack: error.stack || ''
			});

			throw new Error();
		}
	}

	textInRow({
		doc,
		text,
		heigth,
		position,
		font = "",
		size = 12,
		align = "left",
	}) {
		font && doc.font(font);
		doc.fontSize(size);
		doc.y = heigth;
		doc.x = position;
		doc.fillColor("black");
		doc.text(text, {
			paragraphGap: 5,
			indent: 5,
			align,
			columns: 1,
		});
		doc.font("Helvetica");
		doc.fontSize(12);
		return doc;
	}

	row(doc, start, height) {
		doc.lineJoin("miter").rect(30, start, 530, height).stroke();
		return doc;
	}
}

module.exports = async ({ fileName, data }) => {
	const pdfBuffer = await new GeneratePDF().generate({ fileName, data });

	console.log(pdfBuffer);

	return pdfBuffer;
}
