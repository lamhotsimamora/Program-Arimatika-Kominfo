Garuda('angka_satu').focus();

/*
* Fungsi merubah text menjadi audio
* Menggunakan library javascript 'responsivevoice'
*/
function textToAudio($text)
{
	// Jika variabel $text tersedia
	if ($text)
	{
		// Panggil function 
		// responsiveVoice.speack();
		responsiveVoice.speak("Hasilnya adalah "+$text,'Indonesian Male');
	}
}

function enterCalc(e){
	if (e.keyCode==13)
	{
		calculate();
	}
}


/*
*  Fungsi menghitung
*/
function calculate(){
	var angka_satu = Garuda('angka_satu').getValue;
	var angka_dua = Garuda('angka_dua').getValue;

	if (angka_satu==='' || angka_satu == null)
	{
		Garuda('angka_satu').focus();
		return;
	}	

	if (angka_dua==='' || angka_dua == null)
	{
		Garuda('angka_dua').focus();
		return;
	}	

	/**
	*  Merubah value dari input text
	*  Menjadi tipe data integer
	*/
	angka_satu = parseInt(angka_satu);
	angka_dua = parseInt(angka_dua);
	
	// membuat variabel operator_used untuk menampung
	// operator (+,-,*,/)
	var operator_used=undefined;

	/*
	* Memeriksa input radio button penjumlahan
	*/
	if (operator_penjumlahan.checked)
	{
		operator_used = 1;
	}
	/*
	* Memeriksa input radio button pengurangan
	*/
	else if (operator_pengurangan.checked)
	{
		operator_used = 2;
	}
	/*
	* Memeriksa input radio button perkalian
	*/
    else if (operator_perkalian.checked)
	{
		operator_used = 3;
	}
	/*
	* Memeriksa input radio button pembagian
	*/
	else if (operator_pembagian.checked)
	{
		operator_used = 4;
	}

	// Membuat variabel baru
	// Untuk menampung hasil
	var result_angka = 0;

	// Check jika variabel operator_used sama dengan undefined
	// maka tampilkan pesan
	if (operator_used===undefined)
	{
		// menampilkan pesan 
		_a("Silahkan Pilih Operator Terlebih Dulu !");
	}else{	
		// Check variabel operator_used
		if (operator_used==1)
		{
			// jika 1, maka operasi perhitungan penjumlahan
			result_angka = angka_satu + angka_dua;	
		}else if (operator_used==2)
		{
			// jika 2, maka operasi perhitungan pengurngan
			result_angka = angka_satu - angka_dua;
		}else if (operator_used==3)
		{
			// jika 3, maka operasi perhitungan perkalian
			result_angka = angka_satu * angka_dua;
		}else if (operator_used==4)
		{
			// jika 4, maka operasi perhitungan pembagian
			result_angka = angka_satu / angka_dua;
		}

		// Menampilkan hasil result_angka ke div 'display_result'
		Garuda('display_result').setHtml(result_angka.toString());

		// Menjalankan fungsi textToAudio()
		// Dengan memasukkan parameter result_angka
		textToAudio(result_angka.toString());

		Garuda('display_terbilang').setHtml(terbilang(result_angka.toString()));
	}
}

function clearAll(){

	// Menggunakan function GarudaInput
	$all_input = new GarudaInput([
		'angka_satu',
		'angka_dua'
	]);	

	$all_input.set('clear');

	// Menghilangkan centang pada semua input radio
	operator_penjumlahan.checked = false;
	operator_pengurangan.checked = false;
	operator_perkalian.checked = false;
	operator_pembagian.checked = false;
}


function terbilang(nilai){
    var bilangan = nilai;
    var kalimat="";
    var angka   = new Array('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');
    var kata    = new Array('','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan');
    var tingkat = new Array('','Ribu','Juta','Milyar','Triliun');
    var panjang_bilangan = bilangan.length;
     
    /* pengujian panjang bilangan */
    if(panjang_bilangan > 15){
        kalimat = "MAAF ~";
    }else{
        /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
        for(i = 1; i <= panjang_bilangan; i++) {
            angka[i] = bilangan.substr(-(i),1);
        }
         
        var i = 1;
        var j = 0;
         
        /* mulai proses iterasi terhadap array angka */
        while(i <= panjang_bilangan){
            subkalimat = "";
            kata1 = "";
            kata2 = "";
            kata3 = "";
             
            /* untuk Ratusan */
            if(angka[i+2] != "0"){
                if(angka[i+2] == "1"){
                    kata1 = "Seratus";
                }else{
                    kata1 = kata[angka[i+2]] + " Ratus";
                }
            }
             
            /* untuk Puluhan atau Belasan */
            if(angka[i+1] != "0"){
                if(angka[i+1] == "1"){
                    if(angka[i] == "0"){
                        kata2 = "Sepuluh";
                    }else if(angka[i] == "1"){
                        kata2 = "Sebelas";
                    }else{
                        kata2 = kata[angka[i]] + " Belas";
                    }
                }else{
                    kata2 = kata[angka[i+1]] + " Puluh";
                }
            }
             
            /* untuk Satuan */
            if (angka[i] != "0"){
                if (angka[i+1] != "1"){
                    kata3 = kata[angka[i]];
                }
            }
             
            /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
            if ((angka[i] != "0") || (angka[i+1] != "0") || (angka[i+2] != "0")){
                subkalimat = kata1+" "+kata2+" "+kata3+" "+tingkat[j]+" ";
            }
             
            /* gabungkan variabe sub kalimat (untuk Satu blok 3 angka) ke variabel kalimat */
            kalimat = subkalimat + kalimat;
            i = i + 3;
            j = j + 1;
        }
         
        /* mengganti Satu Ribu jadi Seribu jika diperlukan */
        if ((angka[5] == "0") && (angka[6] == "0")){
            kalimat = kalimat.replace("Satu Ribu","Seribu");
        }
    }
    return kalimat;
}


var a = 2.5;

var b = _writeLog(_whatThis(a));

_writeLog(b);
