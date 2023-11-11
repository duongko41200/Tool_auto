const { Builder, By, Key, until } = require('selenium-webdriver');

let like = 0;

const AutoSelenium = async (username, password) => {
	const driver = await new Builder().forBrowser('chrome').build();

	await driver.executeScript(
		"Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
	);
	try {
		await driver.get('https://www.instagram.com/accounts/login/');
		// Thực hiện đăng nhập - điều này chỉ mang tính chất minh họa và có thể vi phạm điều khoản sử dụng của Facebook
		const usernameInput = await driver.wait(
			until.elementLocated(By.name('username')),
			5000
		);
		const passwordInput = await driver.wait(
			until.elementLocated(By.name('password')),
			5000
		);
		await usernameInput.sendKeys(username, Key.RETURN);
		await passwordInput.sendKeys(password, Key.RETURN);
		console.log(username, password);
		// Chờ cho trang tải hoàn tất
		await driver.sleep(4000);
		await driver.get('https://www.instagram.com/');

		await driver.sleep(2000);

		// const notNowButton = await driver.findElement(By.xpath('//div[text()="Not Now"]'))
		const notNowButton = await driver.findElement(
			By.xpath('//button[contains(text(), "Not Now")]')
		);
		await driver.sleep(1000);
		if (notNowButton) {
			console.log('Element found. Performing click...');
			await notNowButton.click();
		}

		// Chờ một khoảng thời gian nếu cần thiết
		await driver.sleep(2000);
		let isShowAuto = true;
		while (isShowAuto) {
			try {
				await scrollWithRandomSpeedAndPosition(driver);
			} catch (error) {
				isShowAuto = false;
			}
		}
	} finally {
		// Đóng trình duyệt khi hoàn thành
		// await driver.quit();
	}
};
const scrollWithRandomSpeedAndPosition = async (driver) => {
	// Tạo một số ngẫu nhiên để làm tốc độ cuộn
	const scrollSpeed = parseInt(Math.random() * (500 - 100) + 100);
	const dy = parseInt(Math.random() * (500 - 10 + 1) + 300);

	console.log('dyyyyyyyyyyyyy:', dy);

	const sleep = parseInt(Math.random() * (1000 - 200 + 100) + 200);

	const isScrollUp = parseInt(Math.random() * (500 - 1 + 1) + 1);

	// Cuộn xuống dưới
	// await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
	try {
		await driver.actions().scroll(0, dy, 0, 70).perform();
	} catch (error) {
		console.log('quá chiều dài:', dy);
		await driver.actions().scroll(0, 0, 0, 50).perform();
	}

	// Tạm nghỉ

	await driver.sleep(sleep);
	let countScrollUp = 0;
	// Cuộn lên trên
	if (isScrollUp % 2 === 0) {
		countScrollUp++;
		if (countScrollUp === 10 || isScrollUp % 4 === 0) {
			const scrollSpeed1 = parseInt(Math.random() * (500 - 100) + 100);
			const dy1 = parseInt(Math.random() * (500 - 10 + 1) + 100);
			try {
				console.log("đã cuộn lên")
				await driver.actions().scroll(0, -`${dy1}`, 0, 200).perform();
			} catch (error) {
				await driver.actions().scroll(0, 0, 0, 200).perform();
			}
			if (countScrollUp === 10) {
				countScrollUp = 0;
			}
			await driver.sleep(sleep);
		}
	}

	if (20 < isScrollUp < 33 && isScrollUp % 4 === 0 && like > 0) {
		console.log('da like auto');

		try {
			const likeButtons = await driver.findElements(
				By.css('svg[aria-label="Like"]')
			);



			console.log('Số lượng phần tử tìm thấy:', likeButtons.length);

			await likeButtons[4].click();

			like = like - 1;
			console.log('số like còn ;', like);
		} catch (error) {
			console.log('Không tìm thấy: ' + error);
		}
	}

	// Tạm nghỉ
	// await driver.sleep(sleep);
};

/**
 * Feature Auto
 *
 * 1. AutoLogin (tự động đăng nhập)
 * 2. AutoLike (tự đông like - ở trang chủ)
 *
 */

const AutoLogin = async (req, res) => {
	const params = req.body.param;

	console.log(req.body.param);

	for (let i = 0; i < params.length; i++) {
		AutoSelenium(params[i].username, params[i].password);
	}

	return res.status(200).json({
		status: 'success',
	});
};

const AutoLike = async (req, res) => {
	console.log(req.body);

	like = req.body.numberLike;
	res.status(200).json({
		status: 'success',
	});
};

module.exports = {
	AutoLogin,
	AutoLike,
};
