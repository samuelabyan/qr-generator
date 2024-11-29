        const qrInput = document.getElementById('qr-input');
        const qrContainer = document.getElementById('qr-container');
        const generateBtn = document.getElementById('generate-btn');
        const downloadBtn = document.getElementById('download-btn');
        const notification = document.getElementById('notification');

        function showNotification(message) {
            notification.textContent = message;
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        generateBtn.addEventListener('click', () => {
            const qrValue = qrInput.value.trim();

            if (!qrValue) {
                showNotification('Please enter text or URL to generate a QR code.');
                return;
            }

            // Clear any previous QR code
            qrContainer.innerHTML = '';

            // Generate new QR code
            const qrCode = new QRCode(qrContainer, {
                text: qrValue,
                width: 256,
                height: 256,
            });

            // Allow downloading the QR code
            setTimeout(() => {
                const canvas = qrContainer.querySelector('canvas');
                if (canvas) {
                    const largeCanvas = document.createElement('canvas');
                    largeCanvas.width = 512;
                    largeCanvas.height = 512;

                    const context = largeCanvas.getContext('2d');
                    context.drawImage(canvas, 0, 0, 512, 512);

                    const qrImage = largeCanvas.toDataURL('image/png');
                    downloadBtn.href = qrImage;
                    downloadBtn.classList.add('active'); // Enable download button
                }
            }, 500);
        });