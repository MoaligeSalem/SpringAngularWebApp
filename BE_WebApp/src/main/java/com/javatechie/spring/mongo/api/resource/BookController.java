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

import com.javatechie.spring.mongo.api.model.Csv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.javatechie.spring.mongo.api.model.Book;
import com.javatechie.spring.mongo.api.repository.BookRepository;

import org.springframework.web.multipart.MultipartFile;
import com.javatechie.spring.mongo.api.repository.CsvRepository;


import ch.qos.logback.core.recovery.ResilientSyslogOutputStream;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class BookController {
	@Autowired
	private BookRepository repository;

	@PostMapping("addBook")
	public String saveBook(@RequestBody Book book) {
		repository.save(book);

		return "added book with path:"+ book.getPath() ;
	}
	@RequestMapping(value = "importCSV/path", params = {"pathh", "csvname"})
	public String save(
			/*@PathVariable(value="csvname") String csvname,
			@RequestParam String csvName,
	        @PathVariable(value="path") String path,
	        @RequestParam String pathh){*/

			@RequestParam(value = "pathh") List<String> pathh, @RequestParam(value = "csvname") List<String> csvname) {
		//Book b=new Book();

		for (int i =0; i< pathh.size(); i++) {
			String p = pathh.get(i);
			Book cs = new Book();
			cs.setPath(p);
			cs.setCsvname(csvname.get(i));


			try {
				BufferedReader reader = new BufferedReader(new FileReader(p));

				String line = "";
				while ((line = reader.readLine()) != null) {

					String[] bk = line.split(",");
					cs.setName(bk[0]);
					cs.setDesign_Leakage_Power(bk[1]);
					cs.setDesign_Internal_Power(bk[2]);
					cs.setDesign_Switching_Power(bk[3]);
					cs.setDesign_Total_Power(bk[4]);
					cs.setCombinational_Leakage_Power(bk[5]);
					cs.setCombinational_Internal_Power(bk[6]);
					/*List<String[]> c = new ArrayList<>();
					String[] cc = {

							cs.getName(),
							cs.getDesign_Leakage_Power(),
							cs.getDesign_Internal_Power(),
							cs.getDesign_Switching_Power(),
							cs.getDesign_Total_Power(),
							cs.getCombinational_Leakage_Power(),
							cs.getCombinational_Internal_Power()
					};
					c.add(cc);*/
					repository.save(cs);
				}
				System.out.println("import csv path it's okey");


			} catch (Exception e) {

			}


		}
		return "book saved with path : " + pathh.get(0) + " and name :" + csvname.get(0);

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
	@GetMapping("findAllBooks/{id}")
	public Optional<Book> getBook(@PathVariable int id){
		return repository.findById(id);
	}
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
