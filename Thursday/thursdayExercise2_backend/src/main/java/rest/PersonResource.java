/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author aamandajuhl
 */
@Path("person")
public class PersonResource {

    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

    public class Person {

        public String name;

        public Person(String name) {
            this.name = name;
        }
    }
    public static List<Person> persons = new ArrayList();

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public String demo() {
        return "{\"msg\":\"Hello World\"}";
    }

    @Path("/all")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public String getAllPersons() {

        return GSON.toJson(persons);

    }

    @GET
    @Path("/{name}")
    @Produces({MediaType.APPLICATION_JSON})
    public String getPerson(@PathParam("name") String name) {

        Person p = null;

        for (Person person : persons) {
            if (person.name.equals(name)) {
                p = person;
            }
        }
        return GSON.toJson(p);

    }

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String addPerson(String personAsJSON) {

        Person newPerson = GSON.fromJson(personAsJSON, Person.class);
        persons.add(newPerson);

        return GSON.toJson(persons.get(persons.size() - 1));

    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/edit/{name}")
    public String editPerson(String personAsJSON,
            @PathParam("name") String name) {

        Person oldPerson = null;
        Person newPerson = GSON.fromJson(personAsJSON, Person.class);

        for (Person person : persons) {
            if (person.name.equals(name)) {
                oldPerson = person;
            }
        }
        if (oldPerson != null) {
            oldPerson.name = newPerson.name;
        }

        return GSON.toJson(oldPerson);

    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/delete/{name}")
    public String deletePerson(@PathParam("name") String name) {

        Person p = null;

        for (Person person : persons) {
            if (person.name.equals(name)) {
                p = person;
                persons.remove(p);
            }
        }
        return GSON.toJson(p);
    }
}
