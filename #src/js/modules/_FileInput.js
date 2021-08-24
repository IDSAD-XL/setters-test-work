export class FileInput {
	constructor(el) {
		this.upload = el
		this.uploadBtn = el.querySelector(".upload__button")
		this.input = el.querySelector(".upload__input")
		this.filenameField = el.querySelector(".upload__filename")
		this.attachEventsListener()
	}
	attachEventsListener() {
		let sleep = (time) => new Promise(resolve => setTimeout(resolve, time));
		this.input.addEventListener("change", async (e) => {
			this.upload.classList.add("uploading");
			this.upload.classList.remove("success")
			await sleep(3000);
			this.upload.classList.add("uploaded");
			await sleep(2000);
			this.upload.classList.remove("uploading");
			this.upload.classList.add("uploaded-after");
			this.setSuccess()
			this.upload.classList.add("success")
			await sleep(1000);
			this.upload.classList.remove("uploaded", "uploaded-after");
		});
	}
	setFilename(filename) {
		this.filenameField.textContent = filename;
	}
	setSuccess() {
		this.setFilename(this.input.files[0].name)

	}
}