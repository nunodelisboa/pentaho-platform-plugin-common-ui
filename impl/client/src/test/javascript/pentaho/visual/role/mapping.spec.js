define([
  "pentaho/type/Context",
  "pentaho/visual/base/model",
  "pentaho/visual/role/mapping"
], function(Context, visualModelFactory, mappingFactory) {

  "use strict";

  /* globals describe, it, beforeEach, spyOn */

  describe("pentaho.visual.role.Mapping", function() {

    var VisualModel;
    var Mapping;

    beforeEach(function(done) {

      Context.createAsync()
          .then(function(context) {

            return context.getDependencyApplyAsync([
              "pentaho/visual/base/model",
              "pentaho/visual/role/mapping"
            ], function(_Model, _Mapping) {
              VisualModel = _Model;
              Mapping = _Mapping;
            });
          })
          .then(done, done.fail);

    });

    describe("#isMapped", function() {

      it("should be false when it has zero attributes", function() {

        var mapping = new Mapping();
        expect(mapping.isMapped).toBe(false);
      });

      it("should be true when it has one attribute", function() {

        var mapping = new Mapping({attributes: ["foo"]});
        expect(mapping.isMapped).toBe(true);
      });

      it("should be true when it has two attributes", function() {

        var mapping = new Mapping({attributes: ["foo", "bar"]});
        expect(mapping.isMapped).toBe(true);
      });
    });

    describe("#model", function() {

      it("should have #model return the container `derived`", function() {

        var Derived = VisualModel.extend({
          $type: {
            props: [
              {name: "foo", base: "pentaho/visual/role/property"}
            ]
          }
        });

        var derived = new Derived();
        var mapping = derived.foo;

        expect(mapping.model).toBe(derived);
      });
    });
  });
});
