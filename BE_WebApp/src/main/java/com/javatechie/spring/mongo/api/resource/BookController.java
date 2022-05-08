package com.javatechie.spring.mongo.api.resource;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.lang.annotation.Target;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;

import com.javatechie.spring.mongo.api.model.Compar;
import com.javatechie.spring.mongo.api.model.Csv;
import com.javatechie.spring.mongo.api.repository.ComparRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.javatechie.spring.mongo.api.model.Book;
import com.javatechie.spring.mongo.api.model.Compar;

import com.javatechie.spring.mongo.api.repository.BookRepository;

import org.springframework.web.multipart.MultipartFile;
import com.javatechie.spring.mongo.api.repository.CsvRepository;


import ch.qos.logback.core.recovery.ResilientSyslogOutputStream;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class BookController {
	@Autowired
	private BookRepository repository;
	@Autowired
	private ComparRepository repo;
	@Autowired
	private SequenceGeneratorService seqGener;

	@PostMapping("addBook")
	public String saveBook(@RequestBody Book book) {
		repository.save(book);

		return "added book with path:"+ book.getPath() ;
	}

	@PostMapping("addBookk")
	public String saveeBook(@RequestBody Compar compar) {
		repo.save(compar);

		return "Comparaison file added" ;
	}


	@RequestMapping(value = "importCSV/path", params = {"pathh", "csvname"})
	public String save(

			@RequestParam(value = "pathh") String pathh, @RequestParam(value = "csvname") String csvname) {
		//Book b=new Book();

		String p = pathh;

		Book cs = new Book();

		cs.setId(seqGener.generateSequence(Book.SEQUENCE_NAME));


		cs.setPath(p);
		cs.setCsvname(csvname);


		ArrayList<Csv> f = new ArrayList<>();



		try {
			BufferedReader reader = new BufferedReader(new FileReader(p));

			String line;

			while ((line = reader.readLine())  != null) {

				String[] bk = line.split(",");
				Csv csv = new Csv();
				csv.setName(bk[0]);
				csv.setDesign_Leakage_Power(bk[1]);
				csv.setDesign_Internal_Power(bk[2]);
				csv.setDesign_Switching_Power(bk[3]);
				csv.setDesign_Total_Power(bk[4]);
				csv.setCombinational_Leakage_Power(bk[5]);
				csv.setCombinational_Internal_Power(bk[6]);
				csv.setCombinational_Switching_Power(bk[7]);
				csv.setCombinational_Total_Power(bk[8]);
				csv.setRegister_Leakage_Power(bk[9]);
				csv.setRegister_Internal_Power(bk[10]);
				csv.setRegister_Switching_Power(bk[11]);
				csv.setRegister_Total_Power(bk[12]);
				csv.setMemory_Leakage_Power(bk[13]);
				csv.setMemory_Internal_Power(bk[14]);
				csv.setMemory_Switching_Power(bk[15]);
				csv.setMemory_Total_Power(bk[16]);
				csv.setClock_Network_Leakage_Power(bk[17]);
				csv.setClock_Network_Internal_Power(bk[18]);
				csv.setClock_Network_Switching_Power(bk[19]);
				csv.setClock_Network_Total_Power(bk[20]);



				/*Csv cc = new Csv(	csv.getName(),
						csv.getDesign_Leakage_Power(),
						csv.getDesign_Internal_Power(),
						csv.getDesign_Switching_Power(),
						csv.getDesign_Total_Power(),
						csv.getCombinational_Leakage_Power(),
						csv.getCombinational_Internal_Power(),
						csv.getCombinational_Switching_Power(),
						csv.getCombinational_Total_Power(),
						csv.getRegister_Leakage_Power(),
						csv.getRegister_Internal_Power(),
						csv.getRegister_Switching_Power(),
						csv.getRegister_Total_Power(),
						csv.getMemory_Leakage_Power(),
						csv.getMemory_Internal_Power(),
						csv.getMemory_Switching_Power() ,
						csv.getMemory_Total_Power(),
						csv.getClock_Network_Leakage_Power(),
						csv.getClock_Network_Internal_Power(),
						csv.getClock_Network_Switching_Power(),
						csv.getClock_Network_Total_Power()
				);*/
				f.add(csv);




			}
			System.out.println("import csv path it's okey");
			cs.setFields(f);

		} catch (Exception e) {
// TODO: handle exception
//throw new RuntimeException("fail to import the CSV file");

			//return "Exception";


		}
		repository.save(cs);



		return "book saved with path : " + pathh + " and name :" + csvname;


	}


	@RequestMapping(value = "importCSV/pathh", params = {"pathh", "csvname"})
	public String savee(

			@RequestParam(value = "pathh") String pathh, @RequestParam(value = "csvname") String csvname) {
		//Book b=new Book();

		String p = pathh;

		//Compar csvv = new Compar();

		//css.setId(seqGener.generateSequence(Book.SEQUENCE_NAME));


		//css.setPath(p);
		//css.setCsvname(csvname);


		//ArrayList<Compar> f = new ArrayList<>();



		try {
			BufferedReader reader = new BufferedReader(new FileReader(p));
			reader.readLine();

			String line=null;

			while ((line = reader.readLine())  != null) {

				String[] bk = line.split(",");
				//Compar csvv = new Compar();
				Compar csvv = new Compar();

				csvv.setINSTANCES(bk[0]);
				csvv.setRTL_OLD_PA_DESIGN1(Double.parseDouble(bk[1]));
				csvv.setRTL_NEW_PA_DESIGN1(bk[2]);
				csvv.setDiff1(bk[3]);
				csvv.setRTL_OLD_PA_DESIGN2(bk[4]);
				csvv.setRTL_NEW_PA_DESIGN2(bk[5]);
				csvv.setDiff2(bk[6]);
				csvv.setRTL_OLD_PA_DESIGN3(bk[7]);
				csvv.setRTL_NEW_PA_DESIGN3(bk[8]);
				csvv.setDiff3(bk[9]);
				csvv.setRTL_OLD_PA_DESIGN4(bk[10]);
				csvv.setRTL_NEW_PA_DESIGN4(bk[11]);
				csvv.setDiff4(bk[12]);

				repo.save(csvv);


				/*Csv cc = new Csv(	csv.getName(),
						csv.getDesign_Leakage_Power(),
						csv.getDesign_Internal_Power(),
						csv.getDesign_Switching_Power(),
						csv.getDesign_Total_Power(),
						csv.getCombinational_Leakage_Power(),
						csv.getCombinational_Internal_Power(),
						csv.getCombinational_Switching_Power(),
						csv.getCombinational_Total_Power(),
						csv.getRegister_Leakage_Power(),
						csv.getRegister_Internal_Power(),
						csv.getRegister_Switching_Power(),
						csv.getRegister_Total_Power(),
						csv.getMemory_Leakage_Power(),
						csv.getMemory_Internal_Power(),
						csv.getMemory_Switching_Power() ,
						csv.getMemory_Total_Power(),
						csv.getClock_Network_Leakage_Power(),
						csv.getClock_Network_Internal_Power(),
						csv.getClock_Network_Switching_Power(),
						csv.getClock_Network_Total_Power()
				);*/
				//f.add(csvv);




			}
			System.out.println("import csv path it's okey");
			//css.setField(f);

		} catch (Exception e) {
// TODO: handle exception
//throw new RuntimeException("fail to import the CSV file");

			//return "Exception";


		}
		//repo.save(csvv);



		return "book saved with path : " + pathh + " and name :" + csvname;


	}



			@GetMapping("/path")
	public String saveCu(@RequestParam String path) {
		String csvFile=path;
	try {
			BufferedReader reader = new BufferedReader(new FileReader(csvFile));
			String line = "";
			while ((line = reader.readLine()) != null) {
				String[] book = line.split(";");
				Book cs = new Book();
				int id = Integer.parseInt(book[1]);
				//cs.setId(id);
				cs.setPath(book[0]);
				repository.save(cs);

			}
			System.out.println("import csv path it's okey");


			return "file uploaded successfully";


		} catch (Exception e) {
			return "Exception";

		}

	}


	@CrossOrigin(origins = "http://localhost:4200/comparaison")
	@GetMapping("findAllBooks")
	public List<Book> getBooks(){
		return repository.findAll();
	}

	@GetMapping("findAllBookss")
	public List<Compar> getBookss(){
		return repo.findAll();
	}

	@GetMapping("findAllBooks/{id}")
	public Optional<Book> getBook(@PathVariable int id){
		return repository.findById(id);}
	@DeleteMapping("delete/{id}")
	public String deleteBook(@PathVariable int id) {
		repository.deleteById(id);
		return "deleted book id: "+ id;
	}
	/*@PutMapping("findAllBooks/{id}")
	public String updateBook(@PathVariable int id, @RequestBody Book book) {
		Book b=new Book();
		b=repository.findById(id).orElseThrow(RuntimeException::new);
		b.setPath(book.getPath());
		repository.save(b);
		return "book id "+b.getId()+" updated successfully";
	}*/
	@PostMapping("importCSV")
	public String saveCus(@RequestParam("file") MultipartFile file) {
		//String message = "";
		String csvFile = "src/main/resources/book.csv";
		//Path p = Paths.get("C:/Users/HP PROBOOK/Desktop/bk.csv");
		//String csvFile = p.getFileName().toString();
		if (CSVHelper.hasCSVFormat(file)) {
			try {
				BufferedReader reader = new BufferedReader(new FileReader(csvFile));
				//message = "File uploaded successfully: " + file.getOriginalFilename() + "!";

				String line = "";
				while ((line = reader.readLine()) != null) {
					String[] book = line.split(";");
					Book cs = new Book();
					//Csv csv = new Csv();

					//int id = Integer.parseInt(book[0]);
					//cs.setId(id);
					cs.setPath(book[1]);
					/*csv.setName(book[0]);

					Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);
					Double Design_Switching_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Switching_Power);
					Double Design_Total_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Total_Power);
					Double Combinational_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Combinational_Leakage_Power);
					Double Combinational_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Combinational_Internal_Power);
					/*Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);
					Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);
					Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);
					Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);
					Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);
					Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);
					Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);*/

					repository.save(cs);
				}
				return "file uploaded successfully";


			} catch (Exception e) {
				// TODO: handle exception
				//throw new RuntimeException("fail to import the CSV file");

				//message = "Could not upload the file: " + csvFile;

				return "Exception";

			}
		}

		return "Please upload a csv file!";
	}

}
